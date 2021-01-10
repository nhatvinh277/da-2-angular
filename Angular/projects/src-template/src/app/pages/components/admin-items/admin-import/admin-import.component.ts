import { element } from 'protractor';

// Angular
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject, ViewChild, ViewRef, ElementRef, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { SelectionModel } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, Subscription, ReplaySubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// NGRX
// Service

//Models


import { CdkDragStart, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Import, ItemsImportModel, SaveItemsImportModel } from '../admin-items-model/admin-items.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LayoutUtilsService } from '../../../../../app/helpers/global/services/layout-utils.service';
import { DungChungService } from '../../_common/_services/dung-chung.service';
export interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
}

@Component({
	selector: 'app-admin-import',
	templateUrl: './admin-import.component.html',
    styleUrls: ['../admin-items.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ImportComponent implements OnInit, OnDestroy {
	@ViewChild('fileUploadImport', { static: false }) fileUploadImport : ElementRef;
	// Public properties
	@ViewChild('fileUpload', { static: true }) fileUpload;
	ItemsForm: FormGroup;
	hasFormErrors: boolean = false;
	loadingSubject = new BehaviorSubject<boolean>(true);
	loading$: Observable<boolean>;
	viewLoading: boolean = false;
	isChange: boolean = false;
	_dataImport: any[] = [];
	name: string = '';
	fixedPoint = 2;
	dataSource = new MatTableDataSource<ItemsImportModel>();
	tmpChiTietImport: ItemsImportModel[] = [];
	previousIndex: number; 			// Lưu lại vị trí trước đó khi swap các cột trên lưới
    processImport: boolean = false;	// Có đang chạy import
    selectedType:string = "";
	listType: any[] = [];
	select_Type: string[] = [];
	filtered_Type: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
    Type_FilterCtrl: string = '';
    
	displayedColumns: string[] = ['no','SanPham','Type','Money', 'Sales', 'LinkImage','ThaoTac'];


	/* Selection */
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	/* ------------------------------------------------------------------ */

	//#region Phím tắt
	// @HostListener('window:keyup', ['$event'])
	// keyEvent(event: KeyboardEvent) {
	// 	if (event.keyCode == this.CONFIG.BUTTON_FORM.BACK.KeyCombine.keycode && !this.processImport){
	// 		this.closeDialog();
	// 	}
	// 	if (event.altKey && event.keyCode == this.CONFIG.BUTTON_FORM.LUU.KeyCombine.keycode && !this.processImport) {
	// 		this.save();
	// 	}
	// }
	//#endregion Phím tắt

	private componentSubscriptions: Subscription;
	constructor(
		public dialogRef: MatDialogRef<ImportComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private ItemsFormFB: FormBuilder,
		public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
		private changeDetect: ChangeDetectorRef,
		private dungChungService: DungChungService) {this.dialogRef.disableClose = true; }
	/**
	 * On init
	 */
	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.data = [];
        this.viewLoading = false;
        
		this.loadListType();
        
		this.createForm();

		this.processImport = false;
        //this.applySelectedColumns();
        this.dungChungService.data_import.subscribe(res => {
			if(res != null && res != undefined && res.length > 0){
				this.tmpChiTietImport = [];
				res.forEach(element =>{
					this.tmpChiTietImport.push(element);
				});
				
				this.dataSource.data = this.tmpChiTietImport;
			}
			this.processImport = false;				
			if (!(this.changeDetect as ViewRef).destroyed) {
				this.changeDetect.detectChanges()
			}
		});
	}
	/**
	 * On destroy
	 */
	ngOnDestroy() {
		if (this.componentSubscriptions) {
			this.componentSubscriptions.unsubscribe();
		}
		this.dungChungService.data_import.next([]);
	}
	/**
	 * Create form
	 */
	createForm() {
		this.ItemsForm = this.ItemsFormFB.group({
			FileDuLieu: [''],
		});
	}


	onAlertClose($event) {
		this.hasFormErrors = false;
	}
	closeDialog() {
		this.dialogRef.close({
			isChange: this.isChange
		});
    }
	loadListType() {
		this.dungChungService.listType().subscribe(res => {
			if (res && res.status == 1) {
                this.listType = res.data;
                if(this.listType.length > 0){
                    this.selectedType = this.listType[0].IdType + "";
                }
				this.filtered_Type.next(this.listType.slice());
                this.changeDetect.detectChanges();
			} else {
				this.layoutUtilsService.showErorr(res.error.message);
			}
		})
	}
	//#region Import
	filterListType() {

		if (!this.listType) {
			return;
		}
		// get the search keyword
		let search = this.Type_FilterCtrl;
		if (!search) {
			this.filtered_Type.next(this.listType.slice());
			return;
		} else {
			search = search.toLowerCase();
		}
		this.filtered_Type.next(
			this.listType.filter(ts =>
				(ts.Name).toLowerCase().indexOf(search) > -1)
		);
		this.changeDetect.detectChanges();
	}

	ImportFileMau() {
		let linkdownload = this.dungChungService.downloadTemplate();
		window.open(linkdownload, "_blank");
		// this.dungChungService.downloadTemplate().subscribe(blob => {
		// 	var downloadLink = document.createElement("a");
		// 	var url = URL.createObjectURL(blob);
		// 	downloadLink.href = url;
		// 	downloadLink.download = "IMPORT_ITEMS_MAU";
		// 	document.body.appendChild(downloadLink);
		// 	downloadLink.click();
		// 	document.body.removeChild(downloadLink);
		// });
    }
   
	selectFile(fileUploadImport: any) {
		let el: HTMLElement = this.fileUploadImport.nativeElement as HTMLElement;
		el.click();
		
	}

	FileSelected(evt: any) {
        if(this.selectedType == "" || this.selectedType == undefined){
            this.layoutUtilsService.showErorr('Vui lòng chọn loại sản phẩm trước');
            return;
        }
		if (evt.target.files && evt.target.files.length) {
			let file = evt.target.files[0];
			let fileName = file.name;
			var res = fileName.match(/.txt$/g);
			if (res) {
				if (!res["includes"]('.txt')) {
					this.layoutUtilsService.showErorr('File không hợp lệ, chỉ nhận file định dạng tzt');
					return;
				}
				else {
					this.ItemsForm.controls['FileDuLieu'].patchValue(fileName);
					//this.KhoDeNghiXuatKhoForm.controls['LoaiPhieu'].disable();
					this.processImport = true;
					this.changeDetect.detectChanges();
					this.Importfile(this.selectedType);
				}
			}
			else {
				this.layoutUtilsService.showErorr('File không hợp lệ, chỉ nhận file định dạng xlsx');
				return;
			}
		}
		else {//Không có file
			this.ItemsForm.controls['FileDuLieu'].patchValue('');
		}
		evt.target.type = 'text';
		evt.target.type = 'file';
    }

    Importfile(select_Type) {
		let el: any = this.fileUploadImport.nativeElement;
		var service = this.dungChungService;

		for (var idx = 0; idx < el.files.length; idx++) {

			var extension = el.files[idx].name.split('.').pop();
			var fileName = el.files[idx].name.substring(0,el.files[idx].name.indexOf(extension) - 1);

			let reader = new FileReader();
			reader.readAsDataURL(el.files[idx]);

			reader.onload = function () {
				let base64Str = reader.result as String;
				var metaIdx = base64Str.indexOf(';base64,');
				base64Str = base64Str.substr(metaIdx + 8);

				var data = {
					fileName: fileName,
					base64: base64Str,
                    extension: extension,
                    idLoai: select_Type
				};
                service.lastFileUpload$.next(data);
				service.uploadFileImport(data).subscribe(res => {
					if (res && res.status == 1) {
						service.data_import.next(res.data);
					}
					else {
						service.data_import.next([]);
						service.lastFilterDSExcel$.next([]);
						service.lastFilterInfoExcel$.next(undefined);
						return;
					}
				});
			};
		}
        
	}
	//#endregion Import
	save(){
		if(this.tmpChiTietImport.length == 0){
			this.layoutUtilsService.showErorr("Vui lòng thêm dữ liệu import");
			return false;
		}
		this.processImport = true;

		let data: SaveItemsImportModel[] = [];
		this.tmpChiTietImport.forEach(a =>{
			var __item = new SaveItemsImportModel();
			__item.IdType = a.IdType;
			__item.Type = a.Type;
			__item.Name = a.Name;
			__item.Money = a.Money;
			__item.Sales = a.Sales;
			__item.LinkImage = a.LinkImage;

			data.push(__item);
		});
		
		this.dungChungService.createMultiple(data).subscribe(res => {
			this.processImport = false;
			if(res && res.status == 1){
				this.layoutUtilsService.showInfo('Dữ liệu được import hoàn tất');
				this.isChange = true;
				this.closeDialog();
			}else{
				this.layoutUtilsService.showErorr(res.error.message);
			}
		})
	}

	formatNumber(item: string){
		return Number(Math.round(parseFloat(item + 'e' + this.fixedPoint)) + 'e-'+ this.fixedPoint).toFixed(this.fixedPoint)
	}
	f_currency(value: string): any {
        if(value == '-1') return '';
        if (value == null || value == undefined || value == '') value = '0';
        let nbr = Number((value + '').replace(/,/g, ""));
        return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    }
    
	deleteItem(index: number){
		if (index > -1) {
			this.tmpChiTietImport.splice(index, 1);
		}
		this.tmpChiTietImport = [...this.tmpChiTietImport];
		this.dataSource.data = this.tmpChiTietImport;
		this.changeDetect.detectChanges();
	}
}

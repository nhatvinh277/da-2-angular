import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';
import { QueryParamsModel } from '../../_common/_models/query-params.model';
import { HistoryService } from '../admin-items-service/admin-items.service';
import { LayoutUtilsService } from '../../../../helpers/global/services/layout-utils.service';
import { AdminItemsDataSource } from '../admin-items-datasource/admin-items.datasource';
import { AdminItemsModel, DataItemsModel } from '../admin-items-model/admin-items.model';
import { ImportComponent } from '../admin-import/admin-import.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-admin-items-list',
  templateUrl: './admin-items-list.component.html',
  styleUrls: ['../admin-items.component.scss']
})
export class AdminItemsListComponent implements OnInit {
  
	@ViewChild('keywordSearch', {static: true}) keywordSearch: ElementRef;
	constructor(
		public dialog: MatDialog,
		private service: HistoryService,
		private layoutUtilsService: LayoutUtilsService,
		private changeDetectorRefs: ChangeDetectorRef,
		) {}
	
	ItemsResult: DataItemsModel[] = [];
	tmpItemsResult: DataItemsModel[] = [];
	dataSource: AdminItemsDataSource;
	displayedColumns: string[] = ['no','SanPham','Type','Money', 'Sales', 'LinkImage','ThaoTac'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	
	ngOnInit(): void {
			merge(this.paginator.page)
				.pipe(
					tap(() => {
						this.loadList();
					})
				)
		.subscribe();
		
		this.dataSource = new AdminItemsDataSource(this.service);
		this.layoutUtilsService.setUpPaginationLabels(this.paginator);
		this.dataSource.entitySubject.subscribe(res => {
			this.ItemsResult = res
			this.tmpItemsResult = []
			if(this.ItemsResult != null){
				for(let i = 0; i < this.ItemsResult.length; i++){
					let tmpElement = new DataItemsModel();
					tmpElement.copy(this.ItemsResult[i])
					this.tmpItemsResult.push(tmpElement);
				}
			}
		});

		this.loadList();
		this.changeDetectorRefs.detectChanges()
	}

	loadList() {
		const queryParams = new QueryParamsModel(
			this.filterConfiguration(),
			'asc',
			'',
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.dataSource.loadDatas(queryParams);
	}
	filterConfiguration(): any {
		const filter: any = {};
		filter.keywordSearch = this.keywordSearch.nativeElement.value;
		return filter;
	}
	getFormatDate(v: string = '') {
		if (v != '') {
			return v.includes('T') ? v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2}).*$/g, "$5/$3/$1") : v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})/g, "$5/$3/$1");
		}
		return '';
	}
	f_currency(value: string): any {
			if(value == '-1') return '';
			if (value == null || value == undefined || value == '') value = '0';
			let nbr = Number((value + '').replace(/,/g, ""));
			return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	ImportExcel() {
		const dialogRef = this.dialog.open(ImportComponent,{
			data: {

			},
			height: 'auto',
			width: 'auto'
		});
		dialogRef.afterClosed().subscribe(res => {
			if (!res.isChange) {
				return;
			}
			this.loadList();
		});
	}

}

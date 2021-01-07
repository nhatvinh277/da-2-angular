import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { HistoryDataSource } from '../history-datasource/history.datasource';
import { tap } from 'rxjs/operators';
import { QueryParamsModel } from '../../_common/_models/query-params.model';
import { HistoryService } from '../history-service/history.service';
import { LayoutUtilsService } from '../../../../../app/helpers/global/services/layout-utils.service';
import { ReviewModel } from '../history-model/review.model';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['../history.component.scss']
})
export class HistoryListComponent implements OnInit {
  
	constructor(
		private service: HistoryService,
		private layoutUtilsService: LayoutUtilsService,
		private changeDetectorRefs: ChangeDetectorRef,
		) {}
	
	dataSource: HistoryDataSource;
	displayedColumns: string[] = ['MaDonHang', 'NgayMua', 'SanPham','Money', 'SoLuong', 'TongTien','TrangThai'];

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	
	ngOnInit(): void {
			merge(this.paginator.page)
				.pipe(
					tap(() => {
						this.loadList();
					})
				)
		.subscribe();
		
		this.dataSource = new HistoryDataSource(this.service);
		this.layoutUtilsService.setUpPaginationLabels(this.paginator);
		this.loadList();
		this.changeDetectorRefs.detectChanges()
	}

	loadList() {
		const queryParams = new QueryParamsModel(
			{},
			'asc',
			'',
			this.paginator.pageIndex,
			this.paginator.pageSize
		);
		this.dataSource.loadDatas(queryParams);
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
	review(item){
		const dialogRef = this.layoutUtilsService.Review(item);
		const success = `Đánh giá sản phẩm thành công!`;
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			
			let data =  new ReviewModel();
			data.IdTransactionDetail = item.IdTransactionDetail;
			data.IdItem = item.IdItem;
			data.Text = res.contents;
			data.Rate = res.rating;
			this.service.Review(data).subscribe(res => {
				if (res && res.status === 1) {
					this.layoutUtilsService.showInfo(success);
				}
				else {
					this.layoutUtilsService.showErorr(res.error.message);
				}
				this.changeDetectorRefs.detectChanges();
			});
		});
	}
}

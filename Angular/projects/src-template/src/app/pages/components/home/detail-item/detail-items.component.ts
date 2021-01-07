import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService } from 'projects/src-template/src/app/helpers/global/services/layout-utils.service';
import { ItemModel, ItemOrdersModel } from '../models/home.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-detail-items',
  templateUrl: './detail-items.component.html',
  styleUrls:['../home.component.scss']
})
export class DetailItemsComponent implements OnInit {
  
  data: ItemModel = new ItemModel();
  value:number = 1;
	fixedPoint = 2;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
		private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
		private layoutUtilsService: LayoutUtilsService,
		private router: Router,
    private service: HomeService
  ) {}

  ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const id = +params.id;
			if (id && id > 0) {
				this.data.IdItem = ''+id;
				this.service.getDetail(id).subscribe(res => {
					if(res.status == 1 && res.data != null){
            this.value = 1;
						this.data = res.data;
            this.changeDetectorRefs.detectChanges()
					}
        })
      }
    });	

  }
	f_currency(value: string): any {
		if(value == '-1') return '';
		if (value == null || value == undefined || value == '') value = '0';
		let nbr = Number((value + '').replace(/,/g, ""));
		return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
  getPrice(){
    let s = +this.data.Sales < 0 ? -(+this.data.Sales) : +this.data.Sales;
    let m = +this.data.Money;
    return Math.round((m*100/(100-s)) * 100 / 100) +"";
  }
  reset(){
		if(this.value < 0)
      this.value = 0;
		if(this.value  > 5)
      this.value = 5;
    this.changeDetectorRefs.detectChanges()
  }
  Orders(){
    let user = JSON.parse(localStorage.getItem("UserInfo"));
    if(user==null){
      this.layoutUtilsService.showErorr("Vui lòng đăng nhập để đặt đơn hàng!");
      return;
    }
    let data = new ItemOrdersModel();
    data.IdItem = this.data.IdItem;
    data.Money = this.data.Money;
    data.Quantity = this.value;
    data.Name = this.data.Name;

    const dialogRef = this.layoutUtilsService.showDataOrders(data);
		const success = `Đặt hàng thành công!`;
		dialogRef.afterClosed().subscribe(res => {
			if (!res) {
				return;
			}
			this.service.Orders(data).subscribe(res => {
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
  getWidth(){
    let styles = {
      'width': this.data.RateAvg + '%',
    };
    return styles;
  }
  getWidthUser(i){
    let styles = {
      'width': this.data.UserReview[i].Rate + '%',
    };
    return styles;
  }
  getFormatDate(v: string = '') {
		if (v != '') {
			return v.includes('T') ? v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2}).*$/g, "$5/$3/$1") : v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})/g, "$5/$3/$1");
		}
		return '';
	}
}

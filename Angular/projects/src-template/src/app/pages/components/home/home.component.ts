import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ItemModel } from './models/home.model';
import { HomeService } from './services/home.service';
import { QueryParamsModel } from '../_common/_models/query-params.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ListItems: ItemModel[] = [];

  name: string = 'undefined';
  money: string = '0';
  sales: string = '0';
  linkimage: string = 'blank';
  constructor(
    private service: HomeService,
		private changeDetect: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getListItems();
  }

  getListItems(){
    let queryParams = new QueryParamsModel({});
    this.service.getList(queryParams).subscribe(res => {
			if (res && res.status === 1) {
				this.ListItems = res.data;
				this.changeDetect.detectChanges();
			};
		});
  }

}

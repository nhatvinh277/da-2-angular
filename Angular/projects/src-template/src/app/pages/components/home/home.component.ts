import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ItemModel } from './models/home.model';
import { HomeService } from './services/home.service';
import { QueryParamsModel } from '../_common/_models/query-params.model';
import { ActivatedRoute, Router } from '@angular/router';


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
  type = '';
  constructor(
    private service: HomeService,
    private changeDetect: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = this.router.url;
    
    let queryParams = new QueryParamsModel({},'asc','',0,10,[],true);
    if (this.type && this.type != "/") {
      const filter: any = {};
      filter.type = this.router.url;
      queryParams = new QueryParamsModel(filter,'asc','',0,10,[],true);
    }
    this.getListItems(queryParams);
  }

  loadDataFilter(){
    let queryParams = new QueryParamsModel(this.filterConfigtion(),'asc','',0,10,[],true);
    this.getListItems(queryParams);
  }

  filterConfigtion(){
    const filter: any = {};
    filter.search = this.router.url;
    return filter
  }

  getListItems(queryParams){
    if (this.type && this.type != "/") {
      this.service.getListbyType(queryParams).subscribe(res => {
        if(res.status == 1 && res.data != null){
          this.ListItems = res.data;
          this.changeDetect.detectChanges();
        }else{
          this.ListItems = [];
        }
      });
    } else {
      this.service.getList(queryParams).subscribe(res => {
        if (res && res.status === 1) {
          this.ListItems = res.data;
          this.changeDetect.detectChanges();
        }else{
          this.ListItems = [];
        }
      });
    }
  }
}

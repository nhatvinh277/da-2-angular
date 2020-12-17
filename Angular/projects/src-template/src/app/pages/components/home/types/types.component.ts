// import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import { QueryParamsModel } from '../../_common/_models/query-params.model';
// import { HomeService } from '../services/home.service';
// import { ItemModel } from '../models/home.model';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-types',
//   templateUrl: './types.component.html',
//   styleUrls: ['../home.component.scss']
// })
// export class TypesComponent implements OnInit {
//   ListItems: ItemModel[] = [];

//   name: string = 'undefined';
//   money: string = '0';
//   sales: string = '0';
//   linkimage: string = 'blank';
//   constructor(
//     private service: HomeService,
// 		private activatedRoute: ActivatedRoute,
// 		private changeDetect: ChangeDetectorRef,
//   ) {}

//   ngOnInit(): void {
// 		this.activatedRoute.params.subscribe(params => {
// 			const type = params.type;
// 			if (type && type != "") {
//         const filter: any = {};
//         filter.type = type;
//         let queryParams = new QueryParamsModel(filter);
          
// 				this.service.getListbyType(queryParams).subscribe(res => {
// 					if(res.status == 1 && res.data != null){
//             this.ListItems = res.data;
//             this.changeDetect.detectChanges();
// 					}
// 				});
// 			} else {
//         this.ListItems = [];
// 			}
// 		});
//   }
// }

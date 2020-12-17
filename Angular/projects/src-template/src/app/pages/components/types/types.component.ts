import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { TypesService } from './services/types.service';
import { ItemTypesModel } from './models/items-types.model';
import { QueryParamsModel } from '../_common/_models/query-params.model';

@Component({
  selector: 'app-types',
  templateUrl: './types.component.html',
  styleUrls: ['./types.component.scss']
})
export class TypesComponent implements OnInit {
  ListItems: ItemTypesModel[] = [];

  name: string = 'undefined';
  money: string = '0';
  sales: string = '0';
  linkimage: string = 'blank';
  constructor(
    private service: TypesService,
		private activatedRoute: ActivatedRoute,
		private changeDetect: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			const type = params.type;
			if (type && type != "") {
        const filter: any = {};
        filter.type = type;
        let queryParams = new QueryParamsModel(filter);
          
				this.service.getListbyType(queryParams).subscribe(res => {
					if(res.status == 1 && res.data != null){
            this.ListItems = res.data;
            this.changeDetect.detectChanges();
					}
				});
			} else {
        this.ListItems = [];
			}
		});
  }
}

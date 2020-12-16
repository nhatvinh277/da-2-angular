import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpUtilsService } from '../../../helpers/global/services/http-utils.service';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { HttpClient } from '@angular/common/http';

// Object path
import * as objectPath from 'object-path';

const emptyMenuConfig = {
  items: []
};

const API_ROOT_URL = environment.ApiRoot+"/user";

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  constructor(private httpUtils: HttpUtilsService,private http: HttpClient) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {
    var fs_Assign = (dt: any) => {
			let config = {
        items: []
			};
			let arr = [];

			let _module = {
				title: 'Trang chủ',
				root: true,
				icon: 'flaticon-home-2',
        page: '/',
        bullet: 'dot',
        svg: '',
			};
			config.items.push(_module);

			dt.forEach((item, index) => {
				if(item.Link!='#'){
					let _module = {
						title: '' + item.Title,
						root: true,
						icon: '' + item.Icon,
            page: '' + item.Link,
            bullet: 'dot',
            svg: ''
					};
					config.items.push(_module);
				}
			});
			return config;
		}

		this.GetMenu().subscribe(res => {
			var s = {};
			if (res && res.status == 1)
        s = fs_Assign(res.data);
        this.setMenu(s);
		});
    // this.setMenu(DynamicAsideMenuConfig);
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
  
  GetMenu(){
		const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.post<any>(API_ROOT_URL + '/GetMenu', null, { headers: httpHeaders });
	}
}

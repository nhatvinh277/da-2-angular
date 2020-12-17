import { HttpClient } from '@angular/common/http';
import { Observable,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { QueryParamsModel } from '../../_common/_models/query-params.model';
import { HttpUtilsService } from 'projects/src-template/src/app/helpers/global/services/http-utils.service';
import { QueryResultsModel } from '../../_common/_models/query-results.model';

const API_ROOT_URL = environment.ApiRoot + '/items';

@Injectable()
export class HomeService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	lastFilterDSExcel$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	lastFilterInfoExcel$: BehaviorSubject<any> = new BehaviorSubject(undefined);
	lastFileUpload$: BehaviorSubject<{}> = new BehaviorSubject({});
	data_import:  BehaviorSubject<any[]> = new BehaviorSubject([]);
	ReadOnlyControl: boolean;
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	getData(queryParams: QueryParamsModel): Observable<QueryResultsModel>{
		// const httpHeaders = this.httpUtils.getHttpHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(API_ROOT_URL + '/List', { 
			// headers: httpHeaders,
			params: httpParams
		});
	}
	getList(queryParams: QueryParamsModel): Observable<any> {
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_ROOT_URL + `/List`;
		return this.http.get<any>(url, { 
			params: httpParams
		});
	}
	getListbyType(queryParams: QueryParamsModel): Observable<any> {
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		const url = API_ROOT_URL + `/ListbyType`;
		return this.http.get<any>(url, { 
			params: httpParams
		});
	}
}

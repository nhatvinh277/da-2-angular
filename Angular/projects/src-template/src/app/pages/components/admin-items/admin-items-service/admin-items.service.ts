import { HttpClient } from '@angular/common/http';
import { Observable,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { QueryParamsModel } from '../../_common/_models/query-params.model';
import { HttpUtilsService } from '../../../../../app/helpers/global/services/http-utils.service';
import { QueryResultsModel } from '../../_common/_models/query-results.model';

const API_ROOT_URL = environment.ApiRoot + '/items';
const API_REVIEW_URL = environment.ApiRoot + '/review';

@Injectable()
export class AdminItemService {
	lastFilter$: BehaviorSubject<QueryParamsModel> = new BehaviorSubject(new QueryParamsModel({}, 'asc', '', 0, 10));
	lastFilterDSExcel$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	lastFilterInfoExcel$: BehaviorSubject<any> = new BehaviorSubject(undefined);
	lastFileUpload$: BehaviorSubject<{}> = new BehaviorSubject({});
	data_import:  BehaviorSubject<any[]> = new BehaviorSubject([]);
	ReadOnlyControl: boolean;
	constructor(private http: HttpClient,
		private httpUtils: HttpUtilsService) { }

	getData(queryParams: QueryParamsModel): Observable<QueryResultsModel>{
		const httpHeaders = this.httpUtils.getHttpHeaders();
		const httpParams = this.httpUtils.getFindHTTPParams(queryParams);
		return this.http.get<any>(API_ROOT_URL + '/QL_List', { 
			headers: httpHeaders,
			params: httpParams
		});
	}
	Review(data): Observable<any> {
		const httpHeaders = this.httpUtils.getHttpHeaders();
		const url = `${API_REVIEW_URL}/add`;
		return this.http.post<any>(url, data, { headers: httpHeaders });
	}
	delete(itemId: any): Observable<any> {
		const httpHeaders = this.httpUtils.getHttpHeaders();
		const url = `${API_ROOT_URL}/Delete?IdItem=${itemId}`;
		return this.http.post<any>(url, null, { headers: httpHeaders });
	}

}

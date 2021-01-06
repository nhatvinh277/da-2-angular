import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from '../../../../../app/helpers/global/services/http-utils.service';
import { environment } from '../../../../../environments/environment';

const API_ROOT_URL = environment.ApiRoot + '/common';
const API_WC_URL = environment.ApiRoot + '/dungchung';
const API_ROOT_URL_ITEMS = environment.ApiRoot + '/items';


@Injectable({
    providedIn: 'root'
})
  
export class DungChungService{
    data_import:  BehaviorSubject<any[]> = new BehaviorSubject([]);
	lastFileUpload$: BehaviorSubject<{}> = new BehaviorSubject({});
	lastFilterDSExcel$: BehaviorSubject<any[]> = new BehaviorSubject([]);
	lastFilterInfoExcel$: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService
    ) { }
        
    /*-----------------------------------------*/
    uploadFileImport(data): Observable<any> {
        const url = API_ROOT_URL_ITEMS + '/ImportFile';
        const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.post<any>(url, data, { headers: httpHeaders });
    }
    downloadTemplate(){
		const url = API_ROOT_URL_ITEMS + '/DownLoadFileImportMau';
		return url;
    }
    createMultiple(item): Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        return this.http.post<any>(API_ROOT_URL_ITEMS+'/Item_Mutiple_Insert', item, { headers: httpHeaders });
    }
    listType() : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL_ITEMS + '/Type_List' ;
        return this.http.get<any>(url , { headers: httpHeaders });
    }
}
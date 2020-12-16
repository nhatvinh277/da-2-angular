import { HttpClient, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpUtilsService } from 'projects/src-template/src/app/helpers/global/services/http-utils.service';
import { environment } from 'projects/src-template/src/environments/environment';

const API_ROOT_URL = environment + '/common';
const API_WC_URL = environment + '/dungchung';


@Injectable({
    providedIn: 'root'
})
  
export class DungChungService{

    constructor(
        private http: HttpClient,
        private httpUtils: HttpUtilsService
    ) { }
        
    /* Lấy nhân viên theo phòng ban */
    listNVTheoPB(IdPB: number): Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL + `/NhanVienPB_List?id=${IdPB}` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/

    /* Lấy danh sách hàng hóa theo loại hàng */
    listProductsByType(type:number) : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL + `/HHTheoLoai_List?id=${type}` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/

    /* Lấy danh sách thiết bị sản xuất theo ID công đoạn */
    listDeviceByIDCD(idCongDoan: number) : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL + `/TBSXByCongDoan_List?idCongDoan=${idCongDoan}` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/

    /* Lấy thông số kiểm soát từ qui trình sản xuất dựa vào thành phẩm và công đoạn */
    GetDataTSKXFromQTSXBaseOInHHandCD(idHH: number, idCD: number) : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL + `/GetDataTSKXFromQTSXBaseOInHHandCD?idHH=${idHH}&idCD=${idCD}` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/

    /* Lấy giá trị cấu hình hệ thống phụ thuộc vào config code trong DB sys_config */
    GetValueConfigBaseOnConfigCode(configCode: string) : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_ROOT_URL + `/GetValueConfigBaseOnConfigCode?configCode=${configCode}` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/

    /* Lấy danh sách hàng hóa đang được chạy lệnh sản xuất */
    listProductsFromLenhSX() : Observable<any> {
        const httpHeaders = this.httpUtils.getHttpHeaders();
        const url =  API_WC_URL + `/HHFromLenhSX_List` ;
        return this.http.get<any>(url, { headers: httpHeaders });
    }
    /*-----------------------------------------*/
}
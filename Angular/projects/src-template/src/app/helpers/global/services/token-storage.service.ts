import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class TokenStorage {
    constructor(){

    }
    
    public getToken(): Observable<string>{
        try{
            return of(localStorage.getItem("Token"));
        }catch(e){
            return of("");
        }
    }
    public getAccessToken(): Observable<string> {
      try{
        let user = JSON.parse(localStorage.getItem("UserInfo"));
        const token: string = <string>user.accessToken;
        return of(token);
      }
      catch(e) {
        return of("");
      }
    }
    public setUserInfo(info: any): TokenStorage {
		this.clearUserInfo();
		localStorage.setItem('UserInfo', info);
		return this;
	}
    public setToken(token: any): TokenStorage {
		this.clearToken();
		localStorage.setItem('Token', token);
		return this;
    }
    public clearUserInfo(){
		localStorage.removeItem('UserInfo');
	}
	public clearToken(){
		localStorage.removeItem('Token');
	}
}
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
    public setToken(token: any): TokenStorage {
		this.clearToken();
		localStorage.setItem('Token', token);
		return this;
    }
    
	public clearToken(){
		localStorage.removeItem('Token');
	}
}
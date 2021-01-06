import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription, throwError } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpUtilsService } from '../../helpers/global/services/http-utils.service';
import { HttpClient } from '@angular/common/http';
import { AuthHTTPService } from './auth-http/auth-http.service';
import { ApiResponseModel } from '../_models/api-response-model';
import { TokenStorage } from '../../helpers/global/services/token-storage.service';

const API_LOGIN_URL = environment.ApiRoot + '/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private isLoadingSubject: BehaviorSubject<boolean>;
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  // public fields
  currentUser$: Observable<UserModel>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserModel>;

  get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  constructor(
    private authHttpService: AuthHTTPService,
    private httpUtils: HttpUtilsService,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private router: Router
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    this.unsubscribe.push(subscr);
  }

  // public methods
  login(username: string, password: string): Observable<any> {
		let data = {
			username: username,
			password: password
		}
		return this.http.post<any>(API_LOGIN_URL + "/LoginUser", data)
			.pipe(
				map((result: any) => {
					if (result && result.status !== 1) {
						return result.error;
					}
					return result;
				}),
				tap(this.saveAccessData.bind(this)),
				catchError(this.handleError('', []))
			);
  }
  
  create(data: any): Observable<any> {
		return this.http.post<any>(API_LOGIN_URL + "/Create", data);
  }
	private saveAccessData(response: ApiResponseModel) {  
		if (typeof response !== 'undefined' && response.status === 1) {
			this.tokenStorage.clearUserInfo();
			
			var accessData = {
				accessToken: response.data.Token,
				refreshToken: response.data.Token,
				username: response.data.UserName,
				roles: response.data.Rules,
				fullname: response.data.Fullname,
				id: response.data.Id,
			};
			var user = {
				id: accessData.id,
				roles: accessData.roles,
				accessToken: accessData.accessToken,
				username: accessData.username,
				fullname: accessData.fullname
      }
			this.tokenStorage.setUserInfo(JSON.stringify(user))
		}
		else {
			throwError({ msg: 'error' });
		}
	}
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error("Lỗi", error.message); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
  logout() {
		this.tokenStorage.clearUserInfo();
    // this.router.navigate(['/auth/login'], {
    //   queryParams: {},
    // });
  }
  resetSession(): Observable<any> {
		const httpHeaders = this.httpUtils.getHttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<any>(API_LOGIN_URL+ '/ResetSession', null, { headers: httpHeaders });
	}

  getUserByToken(): Observable<UserModel> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth || !auth.accessToken) {
      return of(undefined);
    }

    this.isLoadingSubject.next(true);
    return this.authHttpService.getUserByToken(auth.accessToken).pipe(
      map((user: UserModel) => {
        if (user) {
          this.currentUserSubject = new BehaviorSubject<UserModel>(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.authHttpService.createUser(user).pipe(
      map(() => {
        this.isLoadingSubject.next(false);
      }),
      switchMap(() => this.login(user.email, user.password)),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    return this.authHttpService
      .forgotPassword(email)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));
  }
  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth accessToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    if (auth && auth.accessToken) {
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel {
    try {
      const authData = JSON.parse(
        localStorage.getItem(this.authLocalStorageToken)
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

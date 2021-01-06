import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DynamicAsideMenuService, LayoutService } from '../../../core';
import KTLayoutQuickSearch from '../../../../../assets/js/layout/extended/quick-search';
import KTLayoutQuickNotifications from '../../../../../assets/js/layout/extended/quick-notifications';
import KTLayoutQuickActions from '../../../../../assets/js/layout/extended/quick-actions';
import KTLayoutQuickCartPanel from '../../../../../assets/js/layout/extended/quick-cart';
import KTLayoutQuickPanel from '../../../../../assets/js/layout/extended/quick-panel';
import KTLayoutQuickUser from '../../../../../assets/js/layout/extended/quick-user';
import KTLayoutHeaderTopbar from '../../../../../assets/js/layout/base/header-topbar';
import { KTUtil } from '../../../../../assets/js/components/util';
import { UserModel } from '../../../_models/user.model';
import { AuthService } from '../../../_services/auth.service';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppState } from '../../../core';
import { select, Store } from '@ngrx/store';
import { currentUser } from '../../../core/pipes/auth.selectors';
import { LayoutUtilsService } from '../../../../../app/helpers/global/services/layout-utils.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit, AfterViewInit {
  user$: Observable<UserModel>;
	user2: UserModel = new UserModel();
	userCurrent = new BehaviorSubject<UserModel>(this.user2);
  subscriptions: Subscription[] = [];
  menuConfig: any;
	isReset: any;
  // tobbar extras
  extraSearchDisplay: boolean;
  extrasSearchLayout: 'offcanvas' | 'dropdown';
  extrasNotificationsDisplay: boolean;
  extrasNotificationsLayout: 'offcanvas' | 'dropdown';
  extrasQuickActionsDisplay: boolean;
  extrasQuickActionsLayout: 'offcanvas' | 'dropdown';
  extrasCartDisplay: boolean;
  extrasCartLayout: 'offcanvas' | 'dropdown';
  extrasQuickPanelDisplay: boolean;
  extrasLanguagesDisplay: boolean;
  extrasUserDisplay: boolean;
  extrasUserLayout: 'offcanvas' | 'dropdown';

  constructor(private layout: LayoutService,
    private layoutUtilsService: LayoutUtilsService,
		private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    public dialog: MatDialog,
		private router: Router,
    private menu: DynamicAsideMenuService,
		private changeDetect: ChangeDetectorRef,
    private auth: AuthService)
  {
		this.user2.clear();
    this.user$ = this.auth.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
    // topbar extras
    this.extraSearchDisplay = this.layout.getProp('extras.search.display');
    this.extrasSearchLayout = this.layout.getProp('extras.search.layout');
    this.extrasNotificationsDisplay = this.layout.getProp(
      'extras.notifications.display'
    );
    this.extrasNotificationsLayout = this.layout.getProp(
      'extras.notifications.layout'
    );
    this.extrasQuickActionsDisplay = this.layout.getProp(
      'extras.quickActions.display'
    );
    this.extrasQuickActionsLayout = this.layout.getProp(
      'extras.quickActions.layout'
    );
    this.extrasCartDisplay = this.layout.getProp('extras.cart.display');
    this.extrasCartLayout = this.layout.getProp('extras.cart.layout');
    this.extrasLanguagesDisplay = this.layout.getProp(
      'extras.languages.display'
    );
    this.extrasUserDisplay = this.layout.getProp('extras.user.display');
    this.extrasUserLayout = this.layout.getProp('extras.user.layout');
    this.extrasQuickPanelDisplay = this.layout.getProp(
      'extras.quickPanel.display'
    );

    let user = JSON.parse(localStorage.getItem("UserInfo"));
    if(user!=null){
      this.user2.fullname = user.fullname;
      this.user2.id = user.id;
      this.user2.isLogin = true;
      this.userCurrent.next(this.user2);
      this.user$ = this.store.pipe(select(currentUser));

      this.isReset = setInterval(() => {
        this.resetSession();
      }, 240000);
    }
    this.changeDetect.detectChanges();
  }
  reloadPage(isLogin:boolean){
    let user = JSON.parse(localStorage.getItem("UserInfo"));
    this.user2.isLogin = isLogin;
    if(user!=null){
      this.user2.fullname = user.fullname;
      this.user2.id = user.id;
      this.userCurrent.next(this.user2);
      this.user$ = this.store.pipe(select(currentUser));
    }
    // menu load
    this.menu.loadMenu();
    this.changeDetect.detectChanges();
  }

	resetSession() {
		try {
			this.auth.resetSession().subscribe(res => {
				if (res && res.status == 1) {

					let user = JSON.parse(localStorage.getItem("UserInfo"));

					user.accessToken = res.data;

					localStorage.setItem('UserInfo', JSON.stringify(user));
				} else {
          this.auth.logout();
				}
			});
		}
		catch (ex) {
      this.auth.logout();
		}
  }
  SignIn(){
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '35vw'
      });

      dialogRef.afterClosed().subscribe(res => {
        if (res.isChange) {
          this.reloadPage(true);
          this.changeDetect.detectChanges();
          return;
        }
        this.reloadPage(false);
        this.changeDetect.detectChanges();
      });
  }
  history(){
    this.router.navigateByUrl('/lich-su-dat-hang', { relativeTo: this.activatedRoute });
  }
  logout(){
    clearInterval(this.isReset);
    this.auth.logout();
    this.reloadPage(false);
    const message = `Đăng xuất thành công`;
    this.layoutUtilsService.showInfo(message);
    this.router.navigateByUrl('', { relativeTo: this.activatedRoute });
  }

  ngAfterViewInit(): void {
    KTUtil.ready(() => {
      // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      // Add 'implements AfterViewInit' to the class.
      if (this.extraSearchDisplay && this.extrasSearchLayout === 'offcanvas') {
        KTLayoutQuickSearch.init('kt_quick_search');
      }

      if (
        this.extrasNotificationsDisplay &&
        this.extrasNotificationsLayout === 'offcanvas'
      ) {
        // Init Quick Notifications Offcanvas Panel
        KTLayoutQuickNotifications.init('kt_quick_notifications');
      }

      if (
        this.extrasQuickActionsDisplay &&
        this.extrasQuickActionsLayout === 'offcanvas'
      ) {
        // Init Quick Actions Offcanvas Panel
        KTLayoutQuickActions.init('kt_quick_actions');
      }

      if (this.extrasCartDisplay && this.extrasCartLayout === 'offcanvas') {
        // Init Quick Cart Panel
        KTLayoutQuickCartPanel.init('kt_quick_cart');
      }

      if (this.extrasQuickPanelDisplay) {
        // Init Quick Offcanvas Panel
        KTLayoutQuickPanel.init('kt_quick_panel');
      }

      if (this.extrasUserDisplay && this.extrasUserLayout === 'offcanvas') {
        // Init Quick User Panel
        KTLayoutQuickUser.init('kt_quick_user');
      }

      // Init Header Topbar For Mobile Mode
      KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
    });
  }
}

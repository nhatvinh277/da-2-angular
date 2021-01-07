import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../../../_services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import * as moment from 'moment';
import { LayoutUtilsService } from '../../../../../../app/helpers/global/services/layout-utils.service';


@Component({templateUrl: 'login-dialog.component.html'})
export class LoginDialogComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    isEnabledError = false;
    isMessageError = '';
    isChange: boolean = false;
    isLogin:boolean = true;

    constructor(
      public dialogRef: MatDialogRef<LoginDialogComponent>,
      private layoutUtilsService: LayoutUtilsService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private auth: AuthService,
      private changeDetect: ChangeDetectorRef,
    ) {
        // redirect to home if already logged in
        if (this.auth.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
      this.createForm();
      this.dialogRef.keydownEvents().subscribe(event => {
        if (event.key == "Escape") {
          this.isChange = false;
          this.back();
        }
  
        this.changeDetect.detectChanges();
      });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    createForm(){
      if(this.isLogin){
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });
      }else{
        this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required],
          repassword: ['', Validators.required],
          fullname: ['', Validators.required],
          gender: ['0', Validators.required],
          birthdate: ['', Validators.required],
          address: ['', Validators.required],
          nationality: ['']
        });
      }
    }
    change(flag:boolean){
      this.isLogin = flag;
      this.createForm();
      this.changeDetect.detectChanges();
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      if(this.isLogin){
        this.auth.login(this.f.username.value, this.f.password.value)
        .subscribe(
          response => {
            if (typeof response !== 'undefined' && response.status === 1) {
              this.isChange = true;
              this.back();
              const message = `Đăng nhập thành công`;
              this.layoutUtilsService.showInfo(message);
              this.changeDetect.detectChanges();
            }
            else{
              this.layoutUtilsService.showErorr(response.message);
              this.loading = false;
              this.changeDetect.detectChanges();
            }
          });
      }
      else{
        if(this.f.password.value != this.f.repassword.value){
          this.layoutUtilsService.showErorr("Mật khẩu nhập lại không khớp");
          this.loading = false;
          return;
        }
        let input = this.prepareData();
        this.auth.create(input).subscribe(res => {
          if (res.status == 1) {
            this.loading = false;
            this.isChange = true;
            const message = `Tạo tài khoản thành công, vui lòng đăng nhập`;
            this.layoutUtilsService.showInfo(message);
            this.isLogin = true;
            this.changeDetect.detectChanges();
          }
          else {
            this.loading = false;
            this.layoutUtilsService.showErorr(res.error.message);				
          }
        });
      }
    }

    prepareData(){
      let data = {
        username: this.f.username.value,
        password: this.f.password.value,
        repassword: this.f.repassword.value,
        fullname: this.f.fullname.value,
        gender: this.f.gender.value,
        birthdate: this.f.birthdate.value == null ? null : moment(this.f.birthdate.value).format('YYYY-MM-DD[T]HH:mm:ss.SSS'),
        address: this.f.address.value,
        nationality: this.f.nationality.value
      }
      return data;
    }

    onAlertClose($event) {
      this.isEnabledError = false;
    }
    back(){
      this.dialogRef.close(
        {
          isChange: this.isChange,
        }
      );
    }
}

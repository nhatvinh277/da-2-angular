import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg';
import { MaterialsAngularModule } from './modules/materials-angular.module';
import { PagesModule } from './pages/pages.module';
import { LibAuthModule } from './pages/_layout/components/auth/lib-auth.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    LibAuthModule,
		MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    MatSnackBarModule,
    MatDialogModule,
    PagesModule,
    MaterialsAngularModule
  ],
  exports: [
  ],
	entryComponents:[
	],
  providers:[
  ]
})
export class LibExportModule { }

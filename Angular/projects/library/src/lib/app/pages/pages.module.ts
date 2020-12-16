import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ActionNotificationComponent } from './_layout/components/action-natification/action-notification.component';
import { DeleteEntityDialogComponent } from './_layout/components/delete-entity-dialog/delete-entity-dialog.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FetchEntityDialogComponent } from './_layout/components/fetch-entity-dialog/fetch-entity-dialog.component';
import { UpdateStatusDialogComponent } from './_layout/components/update-status-dialog/update-status-dialog.component';
import { MaterialsAngularModule } from '../modules/materials-angular.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeleteEntityDialogComponent,
    ActionNotificationComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressBarModule,
    MatIconModule,
    ReactiveFormsModule,
    MaterialsAngularModule
  ],
  providers:[
  ],
  exports:[
    DeleteEntityDialogComponent,
    ActionNotificationComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
  ],
  entryComponents:[
    DeleteEntityDialogComponent,
    ActionNotificationComponent,
    FetchEntityDialogComponent,
    UpdateStatusDialogComponent
  ]
})
export class PagesModule { }

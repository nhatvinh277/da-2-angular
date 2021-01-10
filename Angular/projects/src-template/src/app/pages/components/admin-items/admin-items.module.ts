import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminItemService } from './admin-items-service/admin-items.service';
import { AdminItemsComponent } from './admin-items.component';
import { AdminItemsListComponent } from './admin-items-list/admin-items-list.component';
import { ImportComponent } from './admin-import/admin-import.component';

@NgModule({
  declarations: [
    AdminItemsComponent,
    AdminItemsListComponent,
    ImportComponent],
  imports: [
    CommonModule,
    LibExportModule,
    ReferenceModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminItemsComponent,
        children: [
          {
          path: '',
          component: AdminItemsListComponent
          }
        ]
      },
    ]),
  ],
  providers:[
    AdminItemService
  ]
})
export class AdminItemsModule {}

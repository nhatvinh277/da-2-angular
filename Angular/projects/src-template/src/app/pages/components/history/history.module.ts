import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryComponent } from './history.component';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryService } from './history-service/history.service';

@NgModule({
  declarations: [HistoryComponent,HistoryListComponent],
  imports: [
    CommonModule,
    LibExportModule,
    ReferenceModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HistoryComponent,
        children: [
          {
          path: '',
          component: HistoryListComponent
          }
        ]
      },
    ]),
  ],
  providers:[
    HistoryService
  ]
})
export class HistoryModule {}

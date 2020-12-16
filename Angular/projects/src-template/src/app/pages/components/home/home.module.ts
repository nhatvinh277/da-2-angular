import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { WidgetsModule } from '../../../metronic/partials/content/widgets/widgets.module';
import { ItemsComponent } from './items/items.component';

@NgModule({
  declarations: [HomeComponent,ItemsComponent],
  imports: [
    CommonModule,
    LibExportModule,
    ReferenceModule,
    FormsModule,
    WidgetsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
  exports:[
    ItemsComponent
  ]
})
export class HomeModule {}

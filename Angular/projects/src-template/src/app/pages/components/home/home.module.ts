import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { WidgetsModule } from '../../../metronic/partials/content/widgets/widgets.module';
import { ItemsComponent } from './items/items.component';
import { HomeService } from './services/home.service';
import { DetailItemsComponent } from './detail-item/detail-items.component';
import { OrdersItemsComponent } from './orders-items/orders-items.component';

@NgModule({
  declarations: [
    HomeComponent,
    ItemsComponent,
    DetailItemsComponent
  ],
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
      {
        path: 'detail/:id',
        component: DetailItemsComponent,
      }
    ]),
  ],
  providers:[
    HomeService
  ],
  exports:[
    ItemsComponent,
    DetailItemsComponent
  ],
  entryComponents:[
  ]
})
export class HomeModule {}

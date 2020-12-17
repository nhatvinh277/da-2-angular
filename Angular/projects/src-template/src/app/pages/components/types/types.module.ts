import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WidgetsModule } from '../../../metronic/partials/content/widgets/widgets.module';
import { TypesService } from './services/types.service';
import { TypesComponent } from './types.component';
import { HomeModule } from '../home/home.module';

@NgModule({
  declarations: [TypesComponent],
  imports: [
    CommonModule,
    LibExportModule,
    ReferenceModule,
    FormsModule,
    WidgetsModule,
    HomeModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: TypesComponent,
      },
    ]),
  ],
  providers:[
    TypesService
  ],
  exports:[
    TypesComponent
  ]
})
export class TypesModule {}

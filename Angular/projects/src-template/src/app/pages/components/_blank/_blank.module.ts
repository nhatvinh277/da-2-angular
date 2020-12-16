import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlankComponent } from './_blank.component';
import { LibExportModule } from 'library';
import { ReferenceModule } from '../../reference.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [BlankComponent],
  imports: [
    CommonModule,
    LibExportModule,
    ReferenceModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: BlankComponent,
      },
    ]),
  ],
})
export class BlankModule {}

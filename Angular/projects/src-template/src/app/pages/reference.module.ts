import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgbProgressbarModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
//Extends Services
import { MY_FORMATS_EDIT } from '../helpers/global/services/datepicker';
import { HttpUtilsService } from '../helpers/global/services/http-utils.service';
import { TokenStorage } from '../helpers/global/services/token-storage.service';
import { DungChungService } from './components/_common/_services/dung-chung.service';
import { MaterialsAngularModule } from 'library';
import { LayoutUtilsService } from '../helpers/global/services/layout-utils.service';
import { LayoutConfigService } from './components/_common/_services/layout-config.service';
import { OrdersItemsComponent } from './components/home/orders-items/orders-items.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { ReviewDialogComponent } from './components/home/review-dialog/review-dialog.component';

@NgModule({
	imports: [
		NgbModule,
		CommonModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgbProgressbarModule,
		MaterialsAngularModule
	],
	providers: [
		{ provide: MAT_DATE_LOCALE, useValue: 'vi' },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS_EDIT },
		HttpUtilsService,
		TokenStorage,
		DungChungService,
		LayoutUtilsService,
		LayoutConfigService
	],
	declarations: [
		OrdersItemsComponent,
		ReviewDialogComponent,
		StarRatingComponent
	],
	entryComponents:[
		OrdersItemsComponent,
		ReviewDialogComponent,
		StarRatingComponent
	],
	exports:[
		FormsModule,
		ReactiveFormsModule,
		MaterialsAngularModule,
		StarRatingComponent
	]
})
export class ReferenceModule {}

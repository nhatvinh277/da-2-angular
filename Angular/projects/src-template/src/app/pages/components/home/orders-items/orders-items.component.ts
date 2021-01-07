import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemModel } from '../models/home.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-orders-items',
  templateUrl: './orders-items.component.html',
	changeDetection: ChangeDetectionStrategy.Default
})
export class OrdersItemsComponent implements OnInit {

	viewLoading: boolean = false;
	constructor(
		public dialogRef: MatDialogRef<OrdersItemsComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}
	getTotal(){
		return (+this.data.data.Money * +this.data.data.Quantity)+"";
	}
	/**
	 * Close dialog with false result
	 */
	onNoClick(): void {
		this.dialogRef.close();
	}

	/**
	 * Close dialog with true result
	 */
	onYesClick(): void {
		/* Server loading imitation. Remove this */
		this.viewLoading = true;
		setTimeout(() => {
			this.dialogRef.close(true); // Keep only this row
		}, 0);
	}
  
	f_currency(value: string): any {
		if(value == '-1') return '';
		if (value == null || value == undefined || value == '') value = '0';
		let nbr = Number((value + '').replace(/,/g, ""));
		return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
  getPrice(){
    debugger
    let s = +this.data.Sales < 0 ? -(+this.data.Sales) : +this.data.Sales;
    let m = +this.data.Money;
    return Math.round((m*100/(100-s)) * 100 / 100) +"";
  }
}

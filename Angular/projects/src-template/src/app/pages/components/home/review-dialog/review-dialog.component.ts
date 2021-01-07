import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ItemModel } from '../models/home.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.Default
})
export class ReviewDialogComponent implements OnInit {
	contents: string = '';
	viewLoading: boolean = false;
	
	rating: string = '0';
	starCount: string = '5';
	starColor: string = '#f0c808';
	constructor(
		private snackBar: MatSnackBar,
		public dialogRef: MatDialogRef<ReviewDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
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
		if(this.rating == "0"){
			this.viewLoading = false;
			
			let action = 'Đã hiểu';
			this.snackBar.open("Vui lòng chọn số sao bạn muốn đánh giá!", action, {
				duration: undefined,
				panelClass: ['mat-toolbar','mat-warn']
			});	
			return;
		}
		if(this.contents == ""){
			this.viewLoading = false;
			let action = 'Đã hiểu';
			this.snackBar.open("Vui lòng nhập nội dung đánh giá của bạn về sản phẩm", action, {
				duration: undefined,
				panelClass: ['mat-toolbar','mat-warn']
			});	
			return;
		}
		let data = {
			rating: this.rating,
			contents: this.contents
		}

		setTimeout(() => {
			this.dialogRef.close(data); // Keep only this row
		}, 0);
	}
  
	onRatingChanged(rating){
		console.log(rating);
		this.rating = rating;
	}
}

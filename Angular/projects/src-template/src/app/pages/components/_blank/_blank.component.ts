import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LayoutUtilsService, MessageType } from '../../../helpers/global/services/layout-utils.service';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-blank',
  templateUrl: './_blank.component.html',
  styleUrls: ['./_blank.component.scss']
})
export class BlankComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','actions'];
  dataSource = ELEMENT_DATA;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    private layoutUtilsService: LayoutUtilsService) {}

  ngOnInit(): void {
  }
  deleteItem(item: any) {
    
		const _title: string = 'Xóa phần tử';
		const _description: string = 'Bạn có chắc muốn xóa không?';
		const _waitDesciption: string = 'Dữ liệu đang được xóa...';
    const _deleteMessage = `Xóa thành công`;
    
    const dialogRef =  this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe(res =>{
      if(!res){
        return;
      }
      const foundIndex = this.dataSource.findIndex(x => x.position === item.position);
      // for delete we use splice in order to remove single object from DataService
      this.dataSource.slice(foundIndex, 1);
      this.layoutUtilsService.showActionNotification(_deleteMessage, MessageType.Delete, 5000,true,false);
    })
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls:['../home.component.scss']
})
export class ItemsComponent implements OnInit {
  
  @Input() name?: string = 'undefined';
  @Input() money?: string = '0';
  @Input() sales?: string = '0';
  @Input() rateavg?: string = '0';
  @Input() linkimage?: string = 'blank';

  constructor() {}

  ngOnInit(): void {}
}

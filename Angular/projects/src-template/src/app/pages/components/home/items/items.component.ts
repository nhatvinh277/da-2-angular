import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls:['../home.component.scss']
})
export class ItemsComponent implements OnInit {
  
  @Input() name?: string = 'undefined';
  @Input() id?: string = '';
  @Input() money?: string = '0';
  @Input() sales?: string = '0';
  @Input() rateavg?: string = '0';
  @Input() type?: string = '';
  @Input() RateAvg?: string = '';
  @Input() RateNumber?: string = '';
  @Input() linkimage?: string = 'blank';

  constructor(
    private router: Router,
		private activatedRoute: ActivatedRoute,
    ) {}

  ngOnInit(): void {
  }

  detail(){
			this.router.navigateByUrl(this.type+'/detail/'+this.id, { relativeTo: this.activatedRoute });
  }
  f_currency(value: string): any {
		if(value == '-1') return '';
		if (value == null || value == undefined || value == '') value = '0';
		let nbr = Number((value + '').replace(/,/g, ""));
		return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  getWidth(){
    let styles = {
      'width': this.RateAvg + '%',
    };
    return styles;
  }
}

import { Injectable } from '@angular/core';
import { DungChungService } from '../_services/dung-chung.service';

@Injectable()
export class FunctionPublic{
    static fixedPoint: number = 2;

    constructor(
		private dungChungService: DungChungService,
    ) {}
	
	/*Format Date-time */
    public static getFormatDate(v: string = '') {
		if (v != '') {
			return v.includes('T') ? v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2}).*$/g, "$5/$3/$1") : v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})/g, "$5/$3/$1");
		}
		return '';
	}

	/*Format number */
	public static F_NUMBER(item: any){	
		const regex_c2n = /[-]?[0-9]{1,3}(?:\.?[0-9]{3})*,[0-9]{2}$/g;
		const regex_n2c = /^[-]?[0-9]{1,3}([0-9]{3})*(\.[0-9]{1,2})?$/g;
		const regex_c2c = /[-]?[0-9]{1,3}([0-9]{3})*,[0-9]{3,}/g; // Nhiều hơn 2 số thập phân
		const regex_n2nM = /[-]?[0-9]{1,3}([0-9]{3})*\.[0-9]{3,}$/g; // -4.949999999 = -4.95
		if(item == null || item == undefined || item.toString().trim() == "") return item;
		
		if(item.toString() && item.toString().match(regex_n2nM) != null){
			item = Number(item).toFixed(this.fixedPoint);
		}

		if(item.toString() && item.toString().match(regex_c2n) != null){
			return this.formatComparenumber(item.toString()).toFixed(this.fixedPoint);
		}

		if(item.toString() && item.toString().match(regex_n2c) != null){
			return this.f_currency_VND(this.formatNumber(item.toString()));
		}

		if(item.toString() && item.toString().match(regex_c2c) != null){
			let n1: any = this.formatComparenumber(item.toString());
			n1 = Number(n1).toFixed(this.fixedPoint);
			return this.f_currency_VND(this.formatNumber(n1.toString()));
		}

		return item;
	}
	private static formatComparenumber(number: string){
		return +number.replace(/\./g, "").replace(/,/g, ".");
	}
	private static f_currency_VND(value: string): any {
		if (value == null || value == undefined) return '0,00';
		return new Intl.NumberFormat('de-DE',{ style: 'decimal', currency: 'VND', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
	}
	private static formatNumber(item: string){
		if(item == '' || item == null || item == undefined)	return '';
		return Number(Math.round(parseFloat(item + 'e' + this.fixedPoint)) + 'e-'+ this.fixedPoint).toFixed(this.fixedPoint);
	}
}
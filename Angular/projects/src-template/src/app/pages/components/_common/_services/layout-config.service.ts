// Angular
import { Injectable } from '@angular/core';
// RxJS
import { Subject } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Lodash
import { merge } from 'lodash';
import { LayoutConfigModel } from '../_models/layout-config.model';
// Models

@Injectable()
export class LayoutConfigService {
	// Public properties
	onConfigUpdated$: Subject<LayoutConfigModel>;
	layoutConfig: LayoutConfigModel;
	imgLinkNFCLogo:string='./assets/media/company-logos/NFC-logo-130x120.png'
	/**
	 * Servcie constructor
	 */
	constructor() {
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
	}

	/**
	 * Save layout config to the local storage
	 * @param layoutConfig
	 */
	saveConfig(layoutConfig: LayoutConfigModel): void {
		if (layoutConfig) {
			localStorage.setItem('layoutConfig', JSON.stringify(layoutConfig));
		}
	}

	/**
	 * Get layout config from local storage
	 */
	getSavedConfig(): LayoutConfigModel {
		const config = localStorage.getItem('layoutConfig');		
		try {
			return JSON.parse(config);
		} catch (e) {
		}
	}

	/**
	 * Remove saved layout config and revert back to default
	 */
	resetConfig(): void {
		localStorage.removeItem('layoutConfig');
	}

	/**
	 * Get all config or by object path
	 * @param path | object path separated by dot
	 */
	getConfig(path?: string): LayoutConfigModel | any {
		// merge default layout config with the saved config from layout storage
		// @todo; known issue; viewing 2 or more demos at the time in different browser's tabs, can cause conflict to the layout config
		this.layoutConfig = this.getSavedConfig();

		if (path) {
			// if path is specified, get the value within object
			return objectPath.get(this.layoutConfig, path);
		}
		if(this.layoutConfig&&!this.layoutConfig.basic_layout){
			let item = {
				theme:'darkLeft',
				font_size:'small',
			}
			this.layoutConfig.basic_layout = item;
			this.setThemeBasic(this.layoutConfig);
		}
	
		return this.layoutConfig;
	}
	setThemeBasic(model){
		switch(model.basic_layout.theme){
			case 'darkLeft':{
				model.header.menu.self.display=false;
				model.aside.self.display=true;
				model.header.self.skin='dark';
				model.header.menu.desktop.submenu.skin='dark';
				model.brand.self.skin='dark';
				model.aside.self.skin='dark';
				break;
			}
			case 'darkTop':{
				model.header.menu.self.display=true;
				model.aside.self.display=false;
				model.header.self.skin='dark';
				model.header.menu.desktop.submenu.skin='dark';
				model.brand.self.skin='dark';
				model.aside.self.skin='dark';
				break;
			}	
			case 'lightLeft':{
				model.header.menu.self.display=false;
				model.aside.self.display=true;
				model.header.self.skin='light';
				model.header.menu.desktop.submenu.skin='light';
				model.brand.self.skin='light';
				model.aside.self.skin='light';
				break;
			}	
			case 'lightTop':{
				model.header.menu.self.display=true;
				model.aside.self.display=false;
				model.header.self.skin='light';
				model.header.menu.desktop.submenu.skin='light';
				model.brand.self.skin='light';
				model.aside.self.skin='light';
				break;
			}		
		}
		//set font-size
		let size =model.basic_layout.font_size?model.basic_layout.font_size:'medium';
		model.header.self.font_size=size;
		model.header.topbar.font_size=size;
		model.subheader.font_size=size;
		model.content.font_size=size;
		model.aside.self.font_size=size;
		model.footer.self.font_size=size;	
		return model;
	}
	/**
	 * Set existing config with a new value
	 * @param value
	 * @param save
	 */
	setConfig(value: any, save?: boolean): void {
		//console.log("value", value);
		this.layoutConfig = merge(this.layoutConfig, value);

		if (save) {
			this.saveConfig(this.layoutConfig);
		}

		// fire off an event that all subscribers will listen
		this.onConfigUpdated$.next(this.layoutConfig);
	}

	/**
	 * Get brand logo
	 */
	getLogo(): string {
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
		// set brand logo
		const logoObject = objectPath.get(this.layoutConfig, 'self.logo');

		let logo;
		if (typeof logoObject === 'string') {
			logo = logoObject;
		}
		if (typeof logoObject === 'object') {
			logo =this.imgLinkNFCLogo;
		}
		if (typeof logo === 'undefined') {
			try {
				const logos = objectPath.get(this.layoutConfig, 'self.logo');
				logo = logos[Object.keys(logos)[0]];
			} catch (e) {
			}
		}
		return logo;
	}

	/**
	 * Returns sticky logo
	 */
	getStickyLogo(): string {
		let logo = objectPath.get(this.layoutConfig, 'self.logo.sticky');
		if (typeof logo === 'undefined') {
			logo = this.getLogo();
		}
		return logo + '';
	}

	/**
	 * Initialize layout config
	 * @param config
	 */
	loadConfigs(config: LayoutConfigModel) {
		this.layoutConfig = this.getSavedConfig();
		// use saved config as priority, or load new config if demo does not matched
		if (!this.layoutConfig || objectPath.get(this.layoutConfig, 'demo') !== config.demo) {
			this.layoutConfig = config;
		}
		this.saveConfig(this.layoutConfig);
	}

	/**
	 * Reload current layout config to the state of latest saved config
	 */
	reloadConfigs(): LayoutConfigModel {
		this.layoutConfig = this.getSavedConfig();
		this.onConfigUpdated$.next(this.layoutConfig);
		return this.layoutConfig;
	}

	/**
	 * Get default route name by object
	 */
	getCurrentMainRoute(): string {
		const config = this.getConfig();
		if (!config) {
			// tslint:disable-next-line:no-string-throw
			return '';
		}

		const url = config.demo;
		if (!url) {
			// tslint:disable-next-line:no-string-throw
			return '';
		}

		return url;
	}
	getTypeLoginForm(): number {
		const menuAsideLeftSkin = objectPath.get(this.layoutConfig, 'brand.self.skin');
		// set brand logo
		const loginObject = objectPath.get(this.layoutConfig, 'self.loginForm');

		let _typeForm;
		if (typeof loginObject === 'number') {
			_typeForm = loginObject;
		}	
		if (typeof _typeForm === 'undefined') {//mặc đinh load form nào
			_typeForm = 1;
		}
		return _typeForm;
	}
}

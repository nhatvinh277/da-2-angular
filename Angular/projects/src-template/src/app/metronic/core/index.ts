import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export { LayoutService } from './services/layout.service';
export { LayoutInitService } from './services/layout-init.service';
export { DynamicAsideMenuService } from './services/dynamic-aside-menu.service';
export { DynamicHeaderMenuService } from './services/dynamic-header-menu.service';
export { CoreModule } from './core.module';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer } from '@ngrx/router-store';


export interface AppState { }


export const reducers: ActionReducerMap<AppState> = { router: routerReducer };

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

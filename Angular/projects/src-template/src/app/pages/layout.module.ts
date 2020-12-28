import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from '../metronic/_layout/layout.component';
import { ScriptsInitComponent } from '../metronic/_layout/init/scipts-init/scripts-init.component';
import { AsideComponent } from '../metronic/_layout/components/aside/aside.component';
import { FooterComponent } from '../metronic/_layout/components/footer/footer.component';
import { HeaderComponent } from '../metronic/_layout/components/header/header.component';
import { HeaderMenuComponent } from '../metronic/_layout/components/header/header-menu/header-menu.component';
import { TopbarComponent } from '../metronic/_layout/components/topbar/topbar.component';
import { LanguageSelectorComponent } from '../metronic/_layout/components/topbar/language-selector/language-selector.component';
import { AsideDynamicComponent } from '../metronic/_layout/components/aside-dynamic/aside-dynamic.component';
import { HeaderMenuDynamicComponent } from '../metronic/_layout/components/header/header-menu-dynamic/header-menu-dynamic.component';
import { HeaderMobileComponent } from '../metronic/_layout/components/header-mobile/header-mobile.component';
import { SubheaderModule } from '../metronic/partials/layout/subheader/subheader.module';
import { NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from '../metronic/core';
import { ExtrasModule } from '../metronic/partials/layout/extras/extras.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ErrorsModule } from '../modules/errors/errors.module';
import { TranslationModule } from '../modules/i18n/translation.module';
import { ReferenceModule } from './reference.module';
import { LoginDialogComponent } from '../metronic/_layout/components/topbar/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ScriptsInitComponent,
    HeaderMobileComponent,
    AsideComponent,
    FooterComponent,
    HeaderComponent,
    HeaderMenuComponent,
    TopbarComponent,
    LanguageSelectorComponent,
    AsideDynamicComponent,
    LoginDialogComponent,
    HeaderMenuDynamicComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    TranslationModule,
    InlineSVGModule,
    ExtrasModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    CoreModule,
    SubheaderModule,
    ErrorsModule,
    ReferenceModule
  ],
  entryComponents:[
    LoginDialogComponent
  ]
})
export class LayoutModule { }

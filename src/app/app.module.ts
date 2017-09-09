import { CovalentPagingModule } from './../platform/core/paging/paging.module';
import { CovalentSearchModule } from './../platform/core/search/search.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, Validators,ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, JsonpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';

import { AppComponent } from './app.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { MdButtonModule, MdListModule, MdIconModule, MdCardModule, MdCoreModule, MdMenuModule, MdTabsModule,
  MdToolbarModule, MdGridListModule, MdTooltipModule, MdInputContainer, MdInputModule, MdSnackBarModule, MdSelectModule
} from '@angular/material';

import { CovalentLayoutModule, CovalentExpansionPanelModule, CovalentNotificationsModule, CovalentMenuModule,
         CovalentMediaModule,CovalentDataTableModule  } from '@covalent/core';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';


import { GitHubService, InternalDocsService, SelectivePreloadingStrategyService } from './services';
import { getSelectedLanguage, createTranslateLoader } from './utilities/translate';


//Componets
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from './components/auth/signup/signup.component';
import { NavComponent } from './components/dashboard/nav/nav.component';
import { ReceiptsComponent } from './components/dashboard/receipts/receipts.component';
import { AddServiceComponent } from './components/dashboard/add-service/add-service.component';
import { AddCategoryComponent } from './components/dashboard/add-category/add-category.component';
import { GetServicesComponent } from './components/dashboard/get-services/get-services.component';

//Services
import { GlobalVariables } from './services/global-var/globalvariable';

import { AddServiceCategoryService  } from "./services/add-service-category.service";
import {  AddServiceService } from "./services/add-service.service";
import { AuthService  } from "./services/auth.service";
import { CategoriesService  } from "./services/categories.service";
import { GetReceiptsService  } from "./services/get-receipts.service";
import {  GetServiceCategoryService } from "./services/get-service-category.service";
import {  GetServiceService } from "./services/get-service.service";
import {  RegxService } from "./services/regx.service";
import { WebapiService  } from "./services/webapi.service";

//External lib
import { AgmCoreModule } from '@agm/core';
import { NavMenuService } from "./services/nav-menu.service";

import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';
import { PagenotfoundComponent } from './components/dashboard/pagenotfound/pagenotfound.component';
import { AccountsettingsComponent } from './components/dashboard/accountsettings/accountsettings.component';
import {DataTableModule} from "angular2-datatable";

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    NavComponent,
    ReceiptsComponent,
    AddServiceComponent,
    AddCategoryComponent,
    GetServicesComponent,
    ImageCropperComponent,
    PagenotfoundComponent,
    AccountsettingsComponent
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    DataTableModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpModule,
    JsonpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWWwrRN2N09Qt5TtJQTQi-4i0bi10LMSE'
    }),
    /** Material Modules */
    MdCoreModule,
    MdButtonModule,
    MdListModule,
    MdIconModule,
    MdCardModule,
    MdMenuModule,
    MdTabsModule,
    MdToolbarModule,
    MdGridListModule,
    MdTooltipModule,
    MdInputModule,
    MdSnackBarModule,
    MdSelectModule,
    /** Covalent Modules */
    CovalentLayoutModule,
    CovalentExpansionPanelModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentMediaModule,
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    CovalentDataTableModule,
    CovalentSearchModule,
    CovalentPagingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [Http],
      },
    }),
    appRoutes,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    GitHubService,
    InternalDocsService, {
      // Configure LOCALE_ID depending on the language set in browser
      provide: LOCALE_ID, useFactory: getSelectedLanguage, deps: [TranslateService],
    },
    SelectivePreloadingStrategyService,
    // Orahi services import
    AddServiceCategoryService,
    AddServiceService,
    AuthService,
    CategoriesService,
    GetReceiptsService,
    GetServiceCategoryService,
    GetServiceService,
    RegxService,
    WebapiService,
    NavMenuService
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}

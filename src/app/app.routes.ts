import { Routes, RouterModule } from '@angular/router';

import { SelectivePreloadingStrategyService } from './services';
import { SigninComponent } from "./components/auth/signin/signin.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ReceiptsComponent } from "./components/dashboard/receipts/receipts.component";
import { NavComponent } from "./components/dashboard/nav/nav.component";
import { AddCategoryComponent } from "./components/dashboard/add-category/add-category.component";
import { AddServiceComponent } from "./components/dashboard/add-service/add-service.component";
import { PagenotfoundComponent } from "./components/dashboard/pagenotfound/pagenotfound.component";
import { AccountsettingsComponent } from './components/dashboard/accountsettings/accountsettings.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/signin', pathMatch: 'full'
  },
  {
    component: SigninComponent,
    path: 'signin',
  },{
    component: SignupComponent,
    path: 'signup',
  },{
    component: NavComponent,
    path: 'dashboard',
    children:[
      { path: '', redirectTo:'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component:NavComponent },
      { path: 'addservice', component:AddServiceComponent },
      { path: 'addservicecategory', component:AddCategoryComponent },
      { path: 'receipts', component:ReceiptsComponent},
      { path: 'settings', component:AccountsettingsComponent},
      { path: '**', component: PagenotfoundComponent }
    ]
  }
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, {
  useHash: true,
  preloadingStrategy: SelectivePreloadingStrategyService,
});

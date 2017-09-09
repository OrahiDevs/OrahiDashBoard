import { Component, OnInit } from '@angular/core';
import { NavMenuService } from "../../../services/nav-menu.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

      title = 'Orahi Dashboard';
      navLinks: Array<any>;
      constructor(private navMenu: NavMenuService, private authService: AuthService){
      }
    
      ngOnInit(): void { 
      }
      routes: Object[] = [{
        icon: 'dashboard',
        route: '/dashboard/receipts',
        title: 'DashBoard',
      }, {
        icon: 'add',
        route: '/dashboard/addservice',
        title: 'Add Service',
      }, {
        icon: 'add_box',
        route: '/dashboard/addservicecategory',
        title: 'Add Service Category',
      }, {
        icon: 'library_books',
        route: '/dashboard/receipts',
        title: 'Receipts',
      }
    ];
    usermenu: Object[] = [ {
        icon: 'tune',
        route: '/dashboard/settings',
        title: 'Account settings',
        method: ()=>{}
      }, {
        icon: 'exit_to_app',
        route: '',
        title: 'Sign out',
        method: this.logout
    
      },
    ];
     
    logout(){
      console.log('I have been clicked');
    }

}

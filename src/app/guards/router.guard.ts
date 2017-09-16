import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


export class Permissions{
    canLoadChildren(token: string): boolean{
        if (token !== null){
            return true
        }
        return false;
    }
}

@Injectable()
export class CanLoadGuard implements CanLoad{

    constructor(
        private permissions: Permissions
    ) {
    }

    canLoad(): boolean | Observable<boolean> | Promise<boolean> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;
        return this.permissions.canLoadChildren(token);
    }
}

@Injectable()
export class CanActivateGuard implements CanActivate{

    constructor(
        private router: Router,
        private permissions: Permissions
    ) {
    }

    canActivate(): boolean | Observable<boolean> | Promise<boolean> {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let token = currentUser.token;
        if(this.permissions.canLoadChildren(token)){
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
}
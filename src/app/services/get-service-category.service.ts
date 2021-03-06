import { Injectable } from '@angular/core';
import { GlobalVariables } from "./global-var/globalvariable";
import { ServiceCategoryModel } from "../models/service-category.model";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class GetServiceCategoryService {

  authUrl:string = GlobalVariables.getInstance().getWebApi();
  serviceCategoryList: Array<ServiceCategoryModel> = new Array<ServiceCategoryModel>();

  constructor(private http: Http) {}

  getServiceCategory(path: string, token: string): Observable<Boolean>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', token);
      headers.append('Accept', 'application/json');
      let requestoptions = new RequestOptions({
          headers: headers
      });


      let urlPath: string = this.authUrl + path;

      return this.http
          .get(urlPath, requestoptions)
          .map((res: Response) => {  
              let test: Array<ServiceCategoryModel> = res.json();        
              this.serviceCategoryList = test;
              if(this.serviceCategoryList.length !== 0){
                  return true;
              }else{
                  return false;
              }
          })
          .catch((err) => this.handleError(err));
  }

  public handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
          const body = error.json() || 'Failed';
          const err = body.message || JSON.stringify(body);
          errMsg = `${err}`;
      } else {
          errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
  }

  public getServiceCategoryList(): Array<ServiceCategoryModel>{
      return this.serviceCategoryList;
  }

}

import { Injectable } from '@angular/core';
import { WebApiPathModel } from "../models/webapi.model";
import { WebApiPathList } from "../assets/app-data/webapi.data";


@Injectable()
export class WebapiService {

  constructor() { }
  getWebApiPaths(): Array<WebApiPathModel>{
    return WebApiPathList;
}

getWebApiPath(name: string): WebApiPathModel{
    return this.getWebApiPaths().find(webApiPath => webApiPath.name === name);
}

}

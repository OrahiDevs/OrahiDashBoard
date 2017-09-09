import { Injectable } from '@angular/core';
import { RegExpModel } from "../models/regx.model";
import { RegExpList } from "../assets/app-data/regx.data";

@Injectable()
export class RegxService {

  constructor() { }
  getRegExps(): Array<RegExpModel>{
    return RegExpList;
}

getRegExp(name: string): RegExpModel{
    return this.getRegExps().find(regExp => regExp.name === name);
}

}

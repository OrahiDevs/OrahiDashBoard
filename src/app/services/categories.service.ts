import { Injectable } from '@angular/core';
import { AppCategoryModel } from "../models/category.model";
import { CategoryList } from "../assets/app-data/categories.data";

@Injectable()
export class CategoriesService {

  constructor() { }
  getCategories(): Promise<Array<AppCategoryModel>> {
    return Promise.resolve(CategoryList);
  }

  getCategoriesSlowly(): Promise<Array<AppCategoryModel>>  {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getCategories()), 100);
    });
  }

  getCategory(_id: string): Promise<AppCategoryModel> {
    return this.getCategories()
      .then(categories => categories.find(category => category._id === _id));
  }

}

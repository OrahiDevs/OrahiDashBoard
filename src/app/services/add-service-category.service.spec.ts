import { TestBed, inject } from '@angular/core/testing';

import { AddServiceCategoryService } from './add-service-category.service';

describe('AddServiceCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddServiceCategoryService]
    });
  });

  it('should be created', inject([AddServiceCategoryService], (service: AddServiceCategoryService) => {
    expect(service).toBeTruthy();
  }));
});

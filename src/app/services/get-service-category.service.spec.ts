import { TestBed, inject } from '@angular/core/testing';

import { GetServiceCategoryService } from './get-service-category.service';

describe('GetServiceCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetServiceCategoryService]
    });
  });

  it('should be created', inject([GetServiceCategoryService], (service: GetServiceCategoryService) => {
    expect(service).toBeTruthy();
  }));
});

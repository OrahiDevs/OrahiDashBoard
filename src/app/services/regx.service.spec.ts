import { TestBed, inject } from '@angular/core/testing';

import { RegxService } from './regx.service';

describe('RegxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegxService]
    });
  });

  it('should be created', inject([RegxService], (service: RegxService) => {
    expect(service).toBeTruthy();
  }));
});

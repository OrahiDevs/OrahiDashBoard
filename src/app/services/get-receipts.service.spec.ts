import { TestBed, inject } from '@angular/core/testing';

import { GetReceiptsService } from './get-receipts.service';

describe('GetReceiptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetReceiptsService]
    });
  });

  it('should be created', inject([GetReceiptsService], (service: GetReceiptsService) => {
    expect(service).toBeTruthy();
  }));
});

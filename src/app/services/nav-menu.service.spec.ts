import { TestBed, inject } from '@angular/core/testing';

import { NavMenuService } from './nav-menu.service';

describe('NavMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavMenuService]
    });
  });

  it('should be created', inject([NavMenuService], (service: NavMenuService) => {
    expect(service).toBeTruthy();
  }));
});

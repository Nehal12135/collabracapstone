import { TestBed } from '@angular/core/testing';

import { ProductresolveService } from './productresolve.service';

describe('ProductresolveService', () => {
  let service: ProductresolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductresolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

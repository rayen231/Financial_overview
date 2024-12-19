import { TestBed } from '@angular/core/testing';

import { StockDetailSService } from './stock-detail-s.service';

describe('StockDetailSService', () => {
  let service: StockDetailSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockDetailSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

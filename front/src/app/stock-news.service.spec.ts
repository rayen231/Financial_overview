import { TestBed } from '@angular/core/testing';

import { StockNewsService } from './stock-news.service';

describe('StockNewsService', () => {
  let service: StockNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HighchartsService } from './highcharts.service';

describe('HighchartsService', () => {
  let service: HighchartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HighchartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

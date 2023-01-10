import { TestBed } from '@angular/core/testing';

import { CrosshairsService } from './crosshairs.service';

describe('CrosshairsService', () => {
  let service: CrosshairsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrosshairsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

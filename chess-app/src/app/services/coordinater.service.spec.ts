import { TestBed } from '@angular/core/testing';

import { CoordinaterService } from './coordinater.service';

describe('CoordinaterService', () => {
  let service: CoordinaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoordinaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StavkeFakturaService } from './stavke-faktura.service';

describe('StavkeFakturaService', () => {
  let service: StavkeFakturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StavkeFakturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

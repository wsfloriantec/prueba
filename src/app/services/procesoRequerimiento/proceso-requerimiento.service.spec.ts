import { TestBed } from '@angular/core/testing';

import { ProcesoRequerimientoService } from './proceso-requerimiento.service';

describe('ProcesoRequerimientoService', () => {
  let service: ProcesoRequerimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoRequerimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

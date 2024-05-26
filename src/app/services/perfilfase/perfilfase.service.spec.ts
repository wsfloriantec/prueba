import { TestBed } from '@angular/core/testing';

import { PerfilfaseService } from './perfilfase.service';

describe('PerfilfaseService', () => {
  let service: PerfilfaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilfaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

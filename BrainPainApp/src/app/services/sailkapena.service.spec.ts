import { TestBed } from '@angular/core/testing';

import { SailkapenaService } from './sailkapena.service';

describe('SailkapenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SailkapenaService = TestBed.get(SailkapenaService);
    expect(service).toBeTruthy();
  });
});

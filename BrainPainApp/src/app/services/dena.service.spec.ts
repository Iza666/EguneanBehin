import { TestBed } from '@angular/core/testing';

import { DenaService } from './dena.service';

describe('DenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DenaService = TestBed.get(DenaService);
    expect(service).toBeTruthy();
  });
});

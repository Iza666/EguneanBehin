import { TestBed } from '@angular/core/testing';

import { PartidakService } from './partidak.service';

describe('PartidakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartidakService = TestBed.get(PartidakService);
    expect(service).toBeTruthy();
  });
});

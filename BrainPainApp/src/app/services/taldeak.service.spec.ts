import { TestBed } from '@angular/core/testing';

import { TaldeakService } from './taldeak.service';

describe('TaldeakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaldeakService = TestBed.get(TaldeakService);
    expect(service).toBeTruthy();
  });
});

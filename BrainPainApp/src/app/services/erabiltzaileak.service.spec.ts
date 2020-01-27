import { TestBed } from '@angular/core/testing';

import { ErabiltzaileakService } from './erabiltzaileak.service';

describe('ErabiltzaileakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErabiltzaileakService = TestBed.get(ErabiltzaileakService);
    expect(service).toBeTruthy();
  });
});

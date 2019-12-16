import { TestBed } from '@angular/core/testing';

import { TrapdestinationsService } from './trapdestinations.service';

describe('TrapdestinationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrapdestinationsService = TestBed.get(TrapdestinationsService);
    expect(service).toBeTruthy();
  });
});

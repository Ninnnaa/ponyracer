import { TestBed } from '@angular/core/testing';

import { RacesResolver } from './races.resolver';

describe('RacesResolver', () => {
  let resolver: RacesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RacesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

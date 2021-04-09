import { TestBed } from '@angular/core/testing';

import { RaceResolverResolver } from './race-resolver.resolver';

describe('RaceResolverResolver', () => {
  let resolver: RaceResolverResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RaceResolverResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { EnrollmentResolver } from './enrollment.resolver';

describe('EnrollmentResolver', () => {
  let resolver: EnrollmentResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EnrollmentResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

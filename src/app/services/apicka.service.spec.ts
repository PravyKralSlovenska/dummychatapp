import { TestBed } from '@angular/core/testing';

import { ApickaService } from './apicka.service';

describe('DummyjsonUsersService', () => {
  let service: ApickaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApickaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

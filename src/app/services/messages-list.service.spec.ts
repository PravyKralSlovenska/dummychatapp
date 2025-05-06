import { TestBed } from '@angular/core/testing';

import { MessagesListService } from './messages-list.service';

describe('MessagesListService', () => {
  let service: MessagesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

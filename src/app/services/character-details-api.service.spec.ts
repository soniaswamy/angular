import { TestBed } from '@angular/core/testing';

import { CharacterDetailsApiService } from './character-detail.service';

describe('CharacterDetailService', () => {
  let service: CharacterDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

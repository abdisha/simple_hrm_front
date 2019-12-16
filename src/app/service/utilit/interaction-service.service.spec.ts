import { TestBed } from '@angular/core/testing';

import { InteractionServiceService } from './interaction-service.service';

describe('InteractionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InteractionServiceService = TestBed.get(InteractionServiceService);
    expect(service).toBeTruthy();
  });
});

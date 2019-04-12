import { TestBed } from '@angular/core/testing';

import { ScriptServiceService } from './script-service.service';

describe('ScriptServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScriptServiceService = TestBed.get(ScriptServiceService);
    expect(service).toBeTruthy();
  });
});

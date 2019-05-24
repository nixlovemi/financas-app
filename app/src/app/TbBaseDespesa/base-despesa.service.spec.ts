import { TestBed } from '@angular/core/testing';

import { BaseDespesaService } from './base-despesa.service';

describe('BaseDespesaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseDespesaService = TestBed.get(BaseDespesaService);
    expect(service).toBeTruthy();
  });
});

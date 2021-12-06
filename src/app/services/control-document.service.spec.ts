import { TestBed } from '@angular/core/testing';

import { ControlDocumentService } from './control-document.service';

describe('ControlDocumentService', () => {
  let service: ControlDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

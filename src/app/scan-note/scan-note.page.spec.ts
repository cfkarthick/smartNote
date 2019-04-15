import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanNotePage } from './scan-note.page';

describe('ScanNotePage', () => {
  let component: ScanNotePage;
  let fixture: ComponentFixture<ScanNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanNotePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

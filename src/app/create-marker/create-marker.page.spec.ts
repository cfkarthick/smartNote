import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarkerPage } from './create-marker.page';

describe('CreateMarkerPage', () => {
  let component: CreateMarkerPage;
  let fixture: ComponentFixture<CreateMarkerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMarkerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarkerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

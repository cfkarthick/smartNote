import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMessagePage } from './create-message.page';

describe('CreateMessagePage', () => {
  let component: CreateMessagePage;
  let fixture: ComponentFixture<CreateMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMessagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

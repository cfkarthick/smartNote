import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagemapPage } from './messagemap.page';

describe('MessagemapPage', () => {
  let component: MessagemapPage;
  let fixture: ComponentFixture<MessagemapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagemapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagemapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

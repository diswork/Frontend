import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCvPage } from './modal-cv.page';

describe('ModalCvPage', () => {
  let component: ModalCvPage;
  let fixture: ComponentFixture<ModalCvPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCvPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCvPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

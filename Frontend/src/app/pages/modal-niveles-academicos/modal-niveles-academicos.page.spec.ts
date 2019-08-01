import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNivelesAcademicosPage } from './modal-niveles-academicos.page';

describe('ModalNivelesAcademicosPage', () => {
  let component: ModalNivelesAcademicosPage;
  let fixture: ComponentFixture<ModalNivelesAcademicosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNivelesAcademicosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNivelesAcademicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

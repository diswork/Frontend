import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGestionarAdministradoresPage } from './modal-gestionar-administradores.page';

describe('ModalGestionarAdministradoresPage', () => {
  let component: ModalGestionarAdministradoresPage;
  let fixture: ComponentFixture<ModalGestionarAdministradoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGestionarAdministradoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGestionarAdministradoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

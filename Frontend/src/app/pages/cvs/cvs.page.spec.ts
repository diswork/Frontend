import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVsPage } from './cvs.page';

describe('CVsPage', () => {
  let component: CVsPage;
  let fixture: ComponentFixture<CVsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

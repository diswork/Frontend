import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmpresa4Page } from './tab-empresa4.page';

describe('TabEmpresa4Page', () => {
  let component: TabEmpresa4Page;
  let fixture: ComponentFixture<TabEmpresa4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEmpresa4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmpresa4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

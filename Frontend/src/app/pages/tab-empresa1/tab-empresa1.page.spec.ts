import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmpresa1Page } from './tab-empresa1.page';

describe('TabEmpresa1Page', () => {
  let component: TabEmpresa1Page;
  let fixture: ComponentFixture<TabEmpresa1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEmpresa1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmpresa1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmpresa2Page } from './tab-empresa2.page';

describe('TabEmpresa2Page', () => {
  let component: TabEmpresa2Page;
  let fixture: ComponentFixture<TabEmpresa2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEmpresa2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmpresa2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

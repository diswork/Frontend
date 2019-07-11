import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabEmpresa3Page } from './tab-empresa3.page';

describe('TabEmpresa3Page', () => {
  let component: TabEmpresa3Page;
  let fixture: ComponentFixture<TabEmpresa3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabEmpresa3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabEmpresa3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

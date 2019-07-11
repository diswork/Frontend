import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUser4Page } from './tab-user4.page';

describe('TabUser4Page', () => {
  let component: TabUser4Page;
  let fixture: ComponentFixture<TabUser4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUser4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUser4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdmin3Page } from './tab-admin3.page';

describe('TabAdmin3Page', () => {
  let component: TabAdmin3Page;
  let fixture: ComponentFixture<TabAdmin3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdmin3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdmin3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

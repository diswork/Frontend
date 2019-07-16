import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdmin2Page } from './tab-admin2.page';

describe('TabAdmin2Page', () => {
  let component: TabAdmin2Page;
  let fixture: ComponentFixture<TabAdmin2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdmin2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdmin2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

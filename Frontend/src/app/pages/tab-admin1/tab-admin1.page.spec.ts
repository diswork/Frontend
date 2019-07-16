import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdmin1Page } from './tab-admin1.page';

describe('TabAdmin1Page', () => {
  let component: TabAdmin1Page;
  let fixture: ComponentFixture<TabAdmin1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdmin1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdmin1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

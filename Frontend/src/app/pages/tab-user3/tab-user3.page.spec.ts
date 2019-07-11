import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUser3Page } from './tab-user3.page';

describe('TabUser3Page', () => {
  let component: TabUser3Page;
  let fixture: ComponentFixture<TabUser3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUser3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUser3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUser2Page } from './tab-user2.page';

describe('TabUser2Page', () => {
  let component: TabUser2Page;
  let fixture: ComponentFixture<TabUser2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUser2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUser2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

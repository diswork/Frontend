import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabUser1Page } from './tab-user1.page';

describe('TabUser1Page', () => {
  let component: TabUser1Page;
  let fixture: ComponentFixture<TabUser1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabUser1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabUser1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

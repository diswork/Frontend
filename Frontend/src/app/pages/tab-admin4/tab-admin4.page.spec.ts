import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabAdmin4Page } from './tab-admin4.page';

describe('TabAdmin4Page', () => {
  let component: TabAdmin4Page;
  let fixture: ComponentFixture<TabAdmin4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabAdmin4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabAdmin4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

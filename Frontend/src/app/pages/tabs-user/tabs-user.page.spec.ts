import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsUserPage } from './tabs-user.page';

describe('TabsUserPage', () => {
  let component: TabsUserPage;
  let fixture: ComponentFixture<TabsUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

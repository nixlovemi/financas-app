import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIndexPage } from './home-index.page';

describe('HomeIndexPage', () => {
  let component: HomeIndexPage;
  let fixture: ComponentFixture<HomeIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeIndexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

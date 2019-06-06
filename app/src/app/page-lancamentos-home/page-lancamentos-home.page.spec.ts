import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLancamentosHomePage } from './page-lancamentos-home.page';

describe('PageLancamentosHomePage', () => {
  let component: PageLancamentosHomePage;
  let fixture: ComponentFixture<PageLancamentosHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLancamentosHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLancamentosHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

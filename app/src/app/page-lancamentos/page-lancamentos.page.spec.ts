import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLancamentosPage } from './page-lancamentos.page';

describe('PageLancamentosPage', () => {
  let component: PageLancamentosPage;
  let fixture: ComponentFixture<PageLancamentosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLancamentosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLancamentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

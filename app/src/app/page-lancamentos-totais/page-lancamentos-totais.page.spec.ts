import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLancamentosTotaisPage } from './page-lancamentos-totais.page';

describe('PageLancamentosTotaisPage', () => {
  let component: PageLancamentosTotaisPage;
  let fixture: ComponentFixture<PageLancamentosTotaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLancamentosTotaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLancamentosTotaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

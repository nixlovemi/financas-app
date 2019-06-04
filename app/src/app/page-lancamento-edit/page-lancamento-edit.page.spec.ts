import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLancamentoEditPage } from './page-lancamento-edit.page';

describe('PageLancamentoEditPage', () => {
  let component: PageLancamentoEditPage;
  let fixture: ComponentFixture<PageLancamentoEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLancamentoEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLancamentoEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

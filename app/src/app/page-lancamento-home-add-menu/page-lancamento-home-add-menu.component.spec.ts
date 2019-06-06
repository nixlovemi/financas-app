import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLancamentoHomeAddMenuComponent } from './page-lancamento-home-add-menu.component';

describe('PageLancamentoHomeAddMenuComponent', () => {
  let component: PageLancamentoHomeAddMenuComponent;
  let fixture: ComponentFixture<PageLancamentoHomeAddMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLancamentoHomeAddMenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLancamentoHomeAddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

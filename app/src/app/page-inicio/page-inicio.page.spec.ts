import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInicioPage } from './page-inicio.page';

describe('PageInicioPage', () => {
  let component: PageInicioPage;
  let fixture: ComponentFixture<PageInicioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInicioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTravelsPage } from './list-travels.page';

describe('ListTravelsPage', () => {
  let component: ListTravelsPage;
  let fixture: ComponentFixture<ListTravelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTravelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTravelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

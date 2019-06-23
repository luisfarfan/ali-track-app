import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTravelsPage } from './my-travels.page';

describe('MyTravelsPage', () => {
  let component: MyTravelsPage;
  let fixture: ComponentFixture<MyTravelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTravelsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTravelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

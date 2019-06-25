import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddObservationPage } from './add-observation.page';

describe('AddObservationPage', () => {
  let component: AddObservationPage;
  let fixture: ComponentFixture<AddObservationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddObservationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddObservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelDetailPage } from './travel-detail.page';

describe('TravelDetailPage', () => {
  let component: TravelDetailPage;
  let fixture: ComponentFixture<TravelDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

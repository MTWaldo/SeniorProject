import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadersGuidePage } from './leaders-guide.page';

describe('LeadersGuidePage', () => {
  let component: LeadersGuidePage;
  let fixture: ComponentFixture<LeadersGuidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadersGuidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadersGuidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

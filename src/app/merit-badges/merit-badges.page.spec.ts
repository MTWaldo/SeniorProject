import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeritBadgesPage } from './merit-badges.page';

describe('MeritBadgesPage', () => {
  let component: MeritBadgesPage;
  let fixture: ComponentFixture<MeritBadgesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeritBadgesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeritBadgesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

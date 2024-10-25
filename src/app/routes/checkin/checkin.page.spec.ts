import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckinPage } from './checkin.page';

describe('CheckinPage', () => {
  let component: CheckinPage;
  let fixture: ComponentFixture<CheckinPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasPage } from './areas.page';

describe('AreasPage', () => {
  let component: AreasPage;
  let fixture: ComponentFixture<AreasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

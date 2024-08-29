import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WarehousesPage } from './warehouses.page';

describe('WarehousesPage', () => {
  let component: WarehousesPage;
  let fixture: ComponentFixture<WarehousesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehousesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

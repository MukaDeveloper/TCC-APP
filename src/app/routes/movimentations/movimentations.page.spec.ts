import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovimentationsPage } from './movimentations.page';

describe('MovimentationsPage', () => {
  let component: MovimentationsPage;
  let fixture: ComponentFixture<MovimentationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

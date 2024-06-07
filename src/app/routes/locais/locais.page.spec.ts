import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocaisPage } from './locais.page';

describe('LocaisPage', () => {
  let component: LocaisPage;
  let fixture: ComponentFixture<LocaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembrosPage } from './membros.page';

describe('MembrosPage', () => {
  let component: MembrosPage;
  let fixture: ComponentFixture<MembrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MembrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

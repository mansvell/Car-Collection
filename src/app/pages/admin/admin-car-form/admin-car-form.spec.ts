import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarForm } from './admin-car-form';

describe('AdminCarForm', () => {
  let component: AdminCarForm;
  let fixture: ComponentFixture<AdminCarForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarsList } from './admin-cars-list';

describe('AdminCarsList', () => {
  let component: AdminCarsList;
  let fixture: ComponentFixture<AdminCarsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCarsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCarsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

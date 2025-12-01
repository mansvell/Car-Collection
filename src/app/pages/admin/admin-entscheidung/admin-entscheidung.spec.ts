import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntscheidung } from './admin-entscheidung';

describe('AdminEntscheidung', () => {
  let component: AdminEntscheidung;
  let fixture: ComponentFixture<AdminEntscheidung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEntscheidung]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEntscheidung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

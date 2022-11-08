import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestViewCardComponent } from './guest-view-card.component';

describe('GuestViewCardComponent', () => {
  let component: GuestViewCardComponent;
  let fixture: ComponentFixture<GuestViewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestViewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GuestViewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

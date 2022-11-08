import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCuecardComponent } from './edit-cuecard.component';

describe('EditCuecardComponent', () => {
  let component: EditCuecardComponent;
  let fixture: ComponentFixture<EditCuecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCuecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCuecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

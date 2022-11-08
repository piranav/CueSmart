import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuecardComponent } from './create-cuecard.component';

describe('CreateCuecardComponent', () => {
  let component: CreateCuecardComponent;
  let fixture: ComponentFixture<CreateCuecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCuecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCuecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

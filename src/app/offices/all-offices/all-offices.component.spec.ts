import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOfficesComponent } from './all-offices.component';

describe('AllOfficesComponent', () => {
  let component: AllOfficesComponent;
  let fixture: ComponentFixture<AllOfficesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOfficesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOfficesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

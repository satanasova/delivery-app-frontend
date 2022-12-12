import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTrucksComponent } from './all-trucks.component';

describe('AllTrucksComponent', () => {
  let component: AllTrucksComponent;
  let fixture: ComponentFixture<AllTrucksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTrucksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTrucksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDeliveryComponent } from './single-delivery.component';

describe('SingleDeliveryComponent', () => {
  let component: SingleDeliveryComponent;
  let fixture: ComponentFixture<SingleDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDeliveryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

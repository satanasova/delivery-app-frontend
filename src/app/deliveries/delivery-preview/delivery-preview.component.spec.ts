import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryPreviewComponent } from './delivery-preview.component';

describe('DeliveryPreviewComponent', () => {
  let component: DeliveryPreviewComponent;
  let fixture: ComponentFixture<DeliveryPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliveryPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

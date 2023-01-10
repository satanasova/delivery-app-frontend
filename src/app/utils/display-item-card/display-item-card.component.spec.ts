import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayItemCardComponent } from './display-item-card.component';

describe('DisplayItemCardComponent', () => {
  let component: DisplayItemCardComponent;
  let fixture: ComponentFixture<DisplayItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

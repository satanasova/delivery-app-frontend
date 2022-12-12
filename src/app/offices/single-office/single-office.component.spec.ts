import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleOfficeComponent } from './single-office.component';

describe('SingleOfficeComponent', () => {
  let component: SingleOfficeComponent;
  let fixture: ComponentFixture<SingleOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

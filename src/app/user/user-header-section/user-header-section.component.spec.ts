import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHeaderSectionComponent } from './user-header-section.component';

describe('UserHeaderSectionComponent', () => {
  let component: UserHeaderSectionComponent;
  let fixture: ComponentFixture<UserHeaderSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHeaderSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHeaderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableSettingsComponent } from './reusable-settings.component';

describe('ReusableSettingsComponent', () => {
  let component: ReusableSettingsComponent;
  let fixture: ComponentFixture<ReusableSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReusableSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

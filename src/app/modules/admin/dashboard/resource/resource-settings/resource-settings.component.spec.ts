import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceSettingsComponent } from './resource-settings.component';

describe('ResourceSettingsComponent', () => {
  let component: ResourceSettingsComponent;
  let fixture: ComponentFixture<ResourceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

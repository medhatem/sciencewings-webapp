import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGeneralSettingsComponent } from './project-general-settings.component';

describe('ProjectGeneralSettingsComponent', () => {
  let component: ProjectGeneralSettingsComponent;
  let fixture: ComponentFixture<ProjectGeneralSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGeneralSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGeneralSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

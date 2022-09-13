import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembershipSettingsComponent } from './project-membership-settings.component';

describe('ProjectMembershipSettingsComponent', () => {
  let component: ProjectMembershipSettingsComponent;
  let fixture: ComponentFixture<ProjectMembershipSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMembershipSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembershipSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectGroupsSettingsComponent } from './project-groups-settings.component';

describe('ProjectGroupsSettingsComponent', () => {
  let component: ProjectGroupsSettingsComponent;
  let fixture: ComponentFixture<ProjectGroupsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectGroupsSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectGroupsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

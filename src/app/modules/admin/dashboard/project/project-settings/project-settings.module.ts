import { NgModule } from '@angular/core';
import { ProjectSettingsComponent } from './project-settings.component';
import { SharedModule } from 'app/shared/shared.module';
import { ProjectGeneralSettingsComponent } from '../../project/project-general-settings/project-general-settings.component';
import { ProjectMembershipSettingsComponent } from '../../project/project-membership-settings/project-membership-settings.component';
import { ProjectGroupsSettingsComponent } from '../../project/project-groups-settings/project-groups-settings.component';
import { RouterModule } from '@angular/router';
import { AddMemberToProjectComponent } from '../add-member-to-project/add-member-to-project.component';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';
import { ReusableSettingsModule } from '../../reusable-components/reusable-settings/reusable-settings.module';

@NgModule({
  declarations: [
    ProjectSettingsComponent,
    ProjectGeneralSettingsComponent,
    ProjectMembershipSettingsComponent,
    ProjectGroupsSettingsComponent,
    AddMemberToProjectComponent,
  ],
  imports: [SharedModule, RouterModule, ListComponentModule, ReusableSettingsModule],
})
export class ProjectSettingsModule {}

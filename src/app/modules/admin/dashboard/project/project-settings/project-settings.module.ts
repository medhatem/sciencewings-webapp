import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReusableSettingsComponent } from '../../reusable-components/reusable-settings/reusable-settings.component';
import { ProjectGeneralSettingsComponent } from '../../project/project-general-settings/project-general-settings.component';
import { ProjectMembershipSettingsComponent } from '../../project/project-membership-settings/project-membership-settings.component';
import { ProjectGroupsSettingsComponent } from '../../project/project-groups-settings/project-groups-settings.component';
import { RouterModule } from '@angular/router';
import { AddMemberToProjectComponent } from '../add-member-to-project/add-member-to-project.component';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';

@NgModule({
  declarations: [
    ProjectSettingsComponent,
    ReusableSettingsComponent,
    ProjectGeneralSettingsComponent,
    ProjectMembershipSettingsComponent,
    ProjectGroupsSettingsComponent,
    AddMemberToProjectComponent,
  ],
  imports: [CommonModule, MatFormFieldModule, SharedModule, TranslocoModule, RouterModule, ListComponentModule],
})
export class ProjectSettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { projectSettingsRoutes } from './project-settings.routing';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ReusableSettingsComponent } from '../../reusable-components/reusable-settings/reusable-settings.component';
import { ProjectGeneralSettingsComponent } from '../../project/project-general-settings/project-general-settings.component';
import { ProjectMembershipSettingsComponent } from '../../project/project-membership-settings/project-membership-settings.component';
import { ProjectGroupsSettingsComponent } from '../../project/project-groups-settings/project-groups-settings.component';

@NgModule({
  declarations: [
    ProjectSettingsComponent,
    ReusableSettingsComponent,
    ProjectGeneralSettingsComponent,
    ProjectMembershipSettingsComponent,
    ProjectGroupsSettingsComponent,
  ],
  imports: [RouterModule.forChild(projectSettingsRoutes), CommonModule, MatFormFieldModule, SharedModule, TranslocoModule],
})
export class ProjectSettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { projectSettingsRoutes } from './project-settings.routing';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ProjectGeneralSettingsComponent } from '../project-general-settings/project-general-settings.component';
import { ProjectGroupsSettingsComponent } from '../project-groups-settings/project-groups-settings.component';
import { ProjectMembershipSettingsComponent } from '../project-membership-settings/project-membership-settings.component';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';

@NgModule({
  declarations: [ProjectSettingsComponent, ProjectGeneralSettingsComponent, ProjectMembershipSettingsComponent, ProjectGroupsSettingsComponent],
  imports: [RouterModule.forChild(projectSettingsRoutes), CommonModule, MatFormFieldModule, SharedModule, TranslocoModule, ListComponentModule],
})
export class ProjectSettingsModule {}

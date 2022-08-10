import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ProjectGeneralSettingsComponent } from '../../project/project-general-settings/project-general-settings.component';
import { ProjectMembershipSettingsComponent } from '../../project/project-membership-settings/project-membership-settings.component';
import { ProjectGroupsSettingsComponent } from '../../project/project-groups-settings/project-groups-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';
import { ReusableSettingsRoutes } from './reusable-settings.component.routing';
import { ReusableSettingsComponent } from './reusable-settings.component';

@NgModule({
  declarations: [
    ReusableSettingsComponent,
    ProjectGeneralSettingsComponent,
    ProjectMembershipSettingsComponent,
    ProjectGroupsSettingsComponent,
  ],
  imports: [
    RouterModule.forChild(ReusableSettingsRoutes),
    CommonModule,
    MatFormFieldModule,
    SharedModule,
    TranslocoModule,
    ListComponentModule,
  ],
})
export class ReusableSettingsModule {}

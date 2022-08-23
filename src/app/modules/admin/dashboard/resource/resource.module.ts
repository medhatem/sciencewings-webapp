import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './resource-form/profile-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { resourceRoutes } from './resource.routing';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { ResourceSettingTagComponent } from './resource-setting-tag/resource-setting-tag.component';
import { ResurceSettingRuleComponent } from './resurce-setting-rule/resurce-setting-rule.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';
import { SettingsGeneralModule } from './resource-settings/general/settings.module';
import { SettingsReservationModule } from './resource-settings/reservation/settings.module';
import { ResourceProfileComponent } from './resource-profile/resource-profile.component';
import { ListComponentModule } from '../reusable-components/list/list-component.module';
import { InfrastructureListComponent } from './infrastructure/infrastructure-list/infrastructure-list.component';
import { InfrastructureFormComponent } from './infrastructure/infrastructure-form/infrastructure-form.component';
@NgModule({
  declarations: [
    ResourceComponent,
    ResourceProfileFormComponent,
    ResourceScheduleComponent,
    ResourceListComponent,
    ResourceSettingTagComponent,
    ResurceSettingRuleComponent,
    InfrastructureListComponent,
    InfrastructureFormComponent,
    ResourceProfileComponent,
  ],
  imports: [
    RouterModule.forChild(resourceRoutes),
    FuseFindByKeyPipeModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatFormFieldModule,
    ListComponentModule,
  ],
})
export class ResourceModule {}

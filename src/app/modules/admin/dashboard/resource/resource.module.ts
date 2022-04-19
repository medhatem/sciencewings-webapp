import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './profile-form/profile-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { resourceRoutes } from './resource.routing';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { ResourceSettingsComponent } from './resource-settings/resource-settings.component';
import { ResourceSettingTagComponent } from './resource-setting-tag/resource-setting-tag.component';
import { ResurceSettingRuleComponent } from './resurce-setting-rule/resurce-setting-rule.component';
import { TranslocoModule } from '@ngneat/transloco';
@NgModule({
  declarations: [
    ResourceComponent,
    ResourceProfileFormComponent,
    ResourceScheduleComponent,
    ResourceListComponent,
    ResourceSettingsComponent,
    ResourceSettingTagComponent,
    ResurceSettingRuleComponent,
  ],
  imports: [RouterModule.forChild(resourceRoutes), FuseFindByKeyPipeModule, SharedModule, NgSelectModule,TranslocoModule],
})
export class ResourceModule {}

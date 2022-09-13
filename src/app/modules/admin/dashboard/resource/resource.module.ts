import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { InfrastructureFormComponent } from './infrastructure/infrastructure-form/infrastructure-form.component';
import { InfrastructureListComponent } from './infrastructure/infrastructure-list/infrastructure-list.component';
import { ListComponentModule } from '../reusable-components/list/list-component.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReservationCreationComponent } from './schedule/reservationCreation/reservation-creation.component';
import { ReservationDetailsComponent } from './schedule/reservationDetails/reservation-details.component';
import { ResourceComponent } from './resource.component';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { ResourceProfileComponent } from './resource-profile/resource-profile.component';
import { ResourceProfileFormComponent } from './resource-form/profile-form.component';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { ResourceSettingTagComponent } from './resource-setting-tag/resource-setting-tag.component';
import { ResurceSettingRuleComponent } from './resurce-setting-rule/resurce-setting-rule.component';
import { RouterModule } from '@angular/router';
import { SettingsGeneralModule } from './resource-settings/general/settings.module';
import { SettingsReservationModule } from './resource-settings/reservation/settings.module';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { resourceRoutes } from './resource.routing';

@NgModule({
  declarations: [
    ResourceComponent,
    ResourceProfileFormComponent,
    ResourceScheduleComponent,
    ReservationDetailsComponent,
    ReservationCreationComponent,
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
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
})
export class ResourceModule {}

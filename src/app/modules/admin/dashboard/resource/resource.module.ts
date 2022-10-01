import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { ListComponentModule } from '../reusable-components/list/list-component.module';
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
import { SharedModule } from 'app/shared/shared.module';
import { resourceRoutes } from './resource.routing';
import { SettingsReservationModule } from './resource-settings/reservation/reservation-settings.module';

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
    ResourceProfileComponent,
  ],
  imports: [
    RouterModule.forChild(resourceRoutes),
    FuseFindByKeyPipeModule,
    SharedModule,
    NgSelectModule,
    ListComponentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    SettingsReservationModule,
  ],
})
export class ResourceModule {}

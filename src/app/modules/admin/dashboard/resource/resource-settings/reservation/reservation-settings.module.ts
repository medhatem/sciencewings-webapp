import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReservationSettingsComponent } from './reservation-settings.component';
import { ResourceSettingReservationGeneralComponent } from './resource-setting-reservation-general/resource-setting-reservation-general.component';
import { ResourceSettingReservationUnitsComponent } from './resource-setting-reservation-units/resource-setting-reservation-units.component';
import { ResourceSettingReservationRatesComponent } from './resource-setting-reservation-rates/resource-setting-reservation-rates.component';
import { ResourceSettingReservationTimeRestrictionComponent } from './resource-setting-reservation-time-restriction/resource-setting-reservation-time-restriction.component';
import { ResourceSettingReservationGroupComponent } from './resource-setting-reservation-group/resource-setting-reservation-group.component';
import { ResourceSettingReservationVisibilityComponent } from './resource-setting-reservation-visibility/resource-setting-reservation-visibility.component';

@NgModule({
  declarations: [
    ReservationSettingsComponent,
    ResourceSettingReservationGeneralComponent,
    ResourceSettingReservationUnitsComponent,
    ResourceSettingReservationRatesComponent,
    ResourceSettingReservationTimeRestrictionComponent,
    ResourceSettingReservationGroupComponent,
    ResourceSettingReservationVisibilityComponent,
  ],
  imports: [SharedModule],
})
export class SettingsReservationModule {}

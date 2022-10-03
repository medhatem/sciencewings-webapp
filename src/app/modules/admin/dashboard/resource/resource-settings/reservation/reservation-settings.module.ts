import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReservationSettingsComponent } from './reservation-settings.component';
import { ResourceSettingReservationGeneralComponent } from './resource-setting-reservation-general/resource-setting-reservation-general.component';
import { ResourceSettingReservationUnitsComponent } from './resource-setting-reservation-units/resource-setting-reservation-units.component';
import { ResourceSettingReservationRatesComponent } from './resource-setting-reservation-rates/resource-setting-reservation-rates.component';
import { ResourceSettingReservationTimeRestrictionComponent } from './resource-setting-reservation-time-restriction/resource-setting-reservation-time-restriction.component';
import { ResourceSettingReservationGroupComponent } from './resource-setting-reservation-group/resource-setting-reservation-group.component';
import { ResourceSettingReservationVisibilityComponent } from './resource-setting-reservation-visibility/resource-setting-reservation-visibility.component';
import { RouterModule } from '@angular/router';
import { settingsReservationRoutes } from './reservation-settings.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';
import { ReusableSettingsModule } from '../../../reusable-components/reusable-settings/reusable-settings.module';

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
  imports: [RouterModule, MatFormFieldModule, SharedModule, TranslocoModule, ReusableSettingsModule],
})
export class SettingsReservationModule {}

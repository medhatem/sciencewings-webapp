import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routing';
import { ResourceSettingReservationGeneralComponent } from './resource-setting-reservation-general/resource-setting-reservation-general.component';
import { ResourceSettingReservationUnitsComponent } from './resource-setting-reservation-units/resource-setting-reservation-units.component';
import { ResourceSettingReservationRatesComponent } from './resource-setting-reservation-rates/resource-setting-reservation-rates.component';
import { ResourceSettingReservationTimeRestrictionComponent } from './resource-setting-reservation-time-restriction/resource-setting-reservation-time-restriction.component';
import { ResourceSettingReservationGroupComponent } from './resource-setting-reservation-group/resource-setting-reservation-group.component';
import { ResourceSettingReservationVisibilityComponent } from './resource-setting-reservation-visibility/resource-setting-reservation-visibility.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    SettingsComponent,
    ResourceSettingReservationGeneralComponent,
    ResourceSettingReservationUnitsComponent,
    ResourceSettingReservationRatesComponent,
    ResourceSettingReservationTimeRestrictionComponent,
    ResourceSettingReservationGroupComponent,
    ResourceSettingReservationVisibilityComponent,
  ],
  imports: [RouterModule.forChild(settingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class SettingsReservationModule {}

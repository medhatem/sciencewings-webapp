import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarketplaceListComponent } from './marketplace-list/marketplace-list.component';
import { RouterModule } from '@angular/router';
import { marketplaceRoutes } from './marketplace.routing';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key/find-by-key.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponentModule } from '../admin/dashboard/reusable-components/list/list-component.module';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { SettingsReservationModule } from '../admin/dashboard/resource/resource-settings/reservation/reservation-settings.module';

@NgModule({
  declarations: [MarketplaceListComponent],
  imports: [
    RouterModule.forChild(marketplaceRoutes),
    SharedModule,
    MatIconModule,
    FuseFindByKeyPipeModule,
    FuseFindByKeyPipeModule,
    NgSelectModule,
    ListComponentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    SettingsReservationModule,
    CommonModule,
  ],
})
export class MarketplaceModule {}

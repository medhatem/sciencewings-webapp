import { NgModule } from '@angular/core';
import { GeneralComponent } from './general/general.component';
import { MembersComponent } from './members/members.component';
import { LocationComponent } from './location/location.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AccessComponent } from './access/access.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { OrganizationSettingsComponent } from './organization-settings.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { organizationSettingsRoutes } from './organization-settings.routing';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    OrganizationSettingsComponent,
    GeneralComponent,
    MembersComponent,
    LocationComponent,
    ReservationsComponent,
    AccessComponent,
    SubscriptionComponent,
  ],
  imports: [RouterModule.forChild(organizationSettingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class OrganizationSettingsModule {}

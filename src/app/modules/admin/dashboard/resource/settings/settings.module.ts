import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { SettingsAccountComponent } from './account/account.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SettingsPlanBillingComponent } from './plan-billing/plan-billing.component';
import { SettingsNotificationsComponent } from './notifications/notifications.component';
import { SettingsTeamComponent } from './team/team.component';
import { settingsRoutes } from './settings.routing';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent,
    SettingsPlanBillingComponent,
    SettingsNotificationsComponent,
    SettingsTeamComponent,
  ],
  imports: [RouterModule.forChild(settingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class SettingsModule {}

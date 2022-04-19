import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routing';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [SettingsComponent],
  imports: [RouterModule.forChild(settingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class SettingsModule {}

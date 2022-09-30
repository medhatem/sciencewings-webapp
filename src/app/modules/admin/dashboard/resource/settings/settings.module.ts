import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { TranslocoModule } from '@ngneat/transloco';

const settingsRoutes = [];

@NgModule({
  declarations: [SettingsComponent],
  imports: [RouterModule.forChild(settingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class SettingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { reusableSettingsRoutes } from './reusable-settings.component.routing';
import { ReusableSettingsComponent } from './reusable-settings.component';

@NgModule({
  declarations: [ReusableSettingsComponent],
  imports: [RouterModule.forChild(reusableSettingsRoutes), CommonModule, MatFormFieldModule, SharedModule, TranslocoModule],
})
export class ReusableSettingsModule {}

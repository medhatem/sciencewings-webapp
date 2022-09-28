import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { ResourceGeneralSettingsComponent } from './resource-general-settings.component';
import { settingsRoutes } from './resource-general-settings.routing';
import { ResourceSettingGeneralGeneralComponent } from './resource-setting-general-general/resource-setting-general-general.component';
import { ResourceSettingGeneralStatusComponent } from './resource-setting-general-status/resource-setting-general-status.component';
import { ResourceSettingGeneralBarcodeComponent } from './resource-setting-general-barcode/resource-setting-general-barcode.component';
import { ResourceSettingGeneralVisibilityComponent } from './resource-setting-general-visibility/resource-setting-general-visibility.component';
import { ResourceSettingGeneralPropertiesComponent } from './resource-setting-general-properties/resource-setting-general-properties.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    ResourceGeneralSettingsComponent,
    ResourceSettingGeneralGeneralComponent,
    ResourceSettingGeneralStatusComponent,
    ResourceSettingGeneralBarcodeComponent,
    ResourceSettingGeneralVisibilityComponent,
    ResourceSettingGeneralPropertiesComponent,
  ],
  imports: [RouterModule.forChild(settingsRoutes), MatFormFieldModule, SharedModule, TranslocoModule],
})
export class SettingsGeneralModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from 'app/shared/shared.module';
import { SettingsComponent } from './settings.component';
import { settingsRoutes } from './settings.routing';
import { ResourceSettingGeneralGeneralComponent } from './resource-setting-general-general/resource-setting-general-general.component';
import { ResourceSettingGeneralStatusComponent } from './resource-setting-general-status/resource-setting-general-status.component';
import { ResourceSettingGeneralBarcodeComponent } from './resource-setting-general-barcode/resource-setting-general-barcode.component';
import { ResourceSettingGeneralVisibilityComponent } from './resource-setting-general-visibility/resource-setting-general-visibility.component';
import { ResourceSettingGeneralPropertiesComponent } from './resource-setting-general-properties/resource-setting-general-properties.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ResourceSettingGeneralGeneralComponent,
    ResourceSettingGeneralStatusComponent,
    ResourceSettingGeneralBarcodeComponent,
    ResourceSettingGeneralVisibilityComponent,
    ResourceSettingGeneralPropertiesComponent,
  ],
  imports: [
    RouterModule.forChild(settingsRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    SharedModule,
  ],
})
export class SettingsGeneralModule {}

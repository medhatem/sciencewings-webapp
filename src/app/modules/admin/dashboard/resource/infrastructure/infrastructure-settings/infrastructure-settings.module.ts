import { NgModule } from '@angular/core';
import { InfrastructureSettingsComponent } from './infrastructure-settings.component';
import { SharedModule } from 'app/shared/shared.module';
import { InfrastructureGeneralSettingsComponent } from '../infrastructure-general-settings/infrastructure-general-settings.component';
import { InfrastructureResourcesSettingsComponent } from '../infrastructure-resources-settings/infrastructure-resources-settings.component';
import { RouterModule } from '@angular/router';
import { ListComponentModule } from '../../../reusable-components/list/list-component.module';
import { ReusableSettingsModule } from '../../../reusable-components/reusable-settings/reusable-settings.module';
import { SubInfrastructureSettingsComponent } from '../sub-infrastructure-settings/sub-infrastructure-settings.component';

@NgModule({
  declarations: [
    InfrastructureSettingsComponent,
    InfrastructureGeneralSettingsComponent,
    SubInfrastructureSettingsComponent,
    InfrastructureResourcesSettingsComponent,
  ],
  imports: [SharedModule, RouterModule, ListComponentModule, ReusableSettingsModule],
})
export class InfrastructureSettingsModule {}

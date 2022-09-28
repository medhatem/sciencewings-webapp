import { NgModule } from '@angular/core';
import { InfrastructureSettingsComponent } from './infrastructure-settings.component';
import { SharedModule } from 'app/shared/shared.module';
import { InfrastructureGeneralSettingsComponent } from '../infrastructure-general-settings/infrastructure-general-settings.component';
import { RouterModule } from '@angular/router';
import { ListComponentModule } from '../../../reusable-components/list/list-component.module';
import { ReusableSettingsModule } from '../../../reusable-components/reusable-settings/reusable-settings.module';

@NgModule({
  declarations: [InfrastructureSettingsComponent, InfrastructureGeneralSettingsComponent],
  imports: [SharedModule, RouterModule, ListComponentModule, ReusableSettingsModule],
})
export class InfrastructureSettingsModule {}

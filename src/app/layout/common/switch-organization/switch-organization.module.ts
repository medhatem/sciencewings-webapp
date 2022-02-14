import { NgModule } from '@angular/core';
import { SwitchOrganizationComponent } from './switch-organization.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SwitchOrganizationComponent],
  imports: [SharedModule],
  exports: [SwitchOrganizationComponent],
})
export class SwitchOrganizationModule {}

import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ReusableSettingsComponent } from './reusable-settings.component';

@NgModule({
  declarations: [ReusableSettingsComponent],
  imports: [SharedModule],
  exports: [ReusableSettingsComponent],
})
export class ReusableSettingsModule {}

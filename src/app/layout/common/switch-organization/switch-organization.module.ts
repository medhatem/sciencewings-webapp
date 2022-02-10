import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SwitchOrganizationComponent } from './switch-organization.component';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [SwitchOrganizationComponent],
  imports: [MatButtonModule, MatIconModule, MatMenuModule, SharedModule],
  exports: [SwitchOrganizationComponent],
})
export class SwitchOrganizationModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationUsersComponent } from './organization-users.component';
import { organizationUsersRoutes } from './organization-users.routing';

@NgModule({
  declarations: [OrganizationUsersComponent],
  imports: [RouterModule.forChild(organizationUsersRoutes), TranslocoModule, SharedModule],
})
export class OrganizationUsersModule {}

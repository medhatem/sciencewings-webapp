import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { organizationDashboardRoutes } from './organization-dashboard.routing';
import { OrganizationDashboardComponent } from './organization-dashboard.component';
@NgModule({
  declarations: [OrganizationDashboardComponent],
  imports: [RouterModule.forChild(organizationDashboardRoutes), TranslocoModule, SharedModule],
})
export class OrganizationDashboardModule {}

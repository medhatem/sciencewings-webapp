import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationProfileComponent } from './profile/organization-profile.component';
import { OrganizationFormComponent } from './form/organization-form.component';
import { AdminOrganizationComponent } from './admin-organization.component';
import { adminOrganizationRoutes } from './admin-organization.routing';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdminOrganizationComponent, OrganizationFormComponent, OrganizationProfileComponent],
  imports: [
    RouterModule.forChild(adminOrganizationRoutes),
    FuseFindByKeyPipeModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
  ],
})
export class AdminOrganizationModule {}

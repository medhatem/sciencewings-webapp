import { ListComponentModule } from '../reusable-components/list/list-component.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationMemebrsComponent } from './organization-members.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { organizationMemebrsRoutes } from './organization-members.routing';

@NgModule({
  declarations: [OrganizationMemebrsComponent, MemberListComponent, MemberFormComponent],
  imports: [
    RouterModule.forChild(organizationMemebrsRoutes),
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatFormFieldModule,
    ListComponentModule,
  ],
})
export class OrganizationMembersModule {}

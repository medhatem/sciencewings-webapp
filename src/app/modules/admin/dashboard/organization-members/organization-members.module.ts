import { ListComponentModule } from '../reusable-components/list/list-component.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberProfileComponent } from './member-profil/MemberProfile.component';
import { MemberProfileFormComponent } from './member-profil/editMemberForm/MemberProfileForm.component';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationMemebrsComponent } from './organization-members.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { organizationMemebrsRoutes } from './organization-members.routing';
import { MemberContractsComponent } from './member-contracts/member-contracts.component';
import { MemberContractsFormComponent } from './member-contracts-form/member-contracts-form.component';
import { MemberUpdateContractComponent } from './member-update-contract/member-update-contract.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    OrganizationMemebrsComponent,
    MemberListComponent,
    MemberFormComponent,
    MemberProfileComponent,
    MemberProfileFormComponent,
    MemberContractsComponent,
    MemberContractsFormComponent,
    MemberUpdateContractComponent,
  ],
  imports: [
    RouterModule.forChild(organizationMemebrsRoutes),
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatFormFieldModule,
    ListComponentModule,
    MatPaginatorModule,
  ],
})
export class OrganizationMembersModule {}

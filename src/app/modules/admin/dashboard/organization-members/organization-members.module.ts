import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberListComponent } from './member-list/member-list.component';
import { OrganizationMemebrsComponent } from './organization-members.component';
import { MemberProfilComponent } from './member-profil/member-profil.component';
import { organizationMemebrsRoutes } from './organization-members.routing';

@NgModule({
  declarations: [OrganizationMemebrsComponent, MemberProfilComponent, MemberListComponent, MemberFormComponent],
  imports: [RouterModule.forChild(organizationMemebrsRoutes), SharedModule, NgSelectModule, TranslocoModule, MatFormFieldModule],
})
export class OrganizationMembersModule {}

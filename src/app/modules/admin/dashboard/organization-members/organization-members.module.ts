import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { MemberProfilComponent } from './member-profil/member-profil.component';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { OrganizationMemebrsyComponent } from './organization-members.component';
import { RouterModule } from '@angular/router';
import { organizationMemebrsRoutes } from './organization-members.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    OrganizationMemebrsyComponent,
    MemberProfilComponent,
    MemberListComponent,
    MemberFormComponent
  ],
  imports: [RouterModule.forChild(organizationMemebrsRoutes),SharedModule, NgSelectModule, TranslocoModule, MatFormFieldModule],
})
export class OrganizationMembersModule { }



import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { OrganizationGroupsComponent } from './organization-groups.component';
import { RouterModule } from '@angular/router';
import { organizationGroupsRoutes } from './organization-groups.routing';
import { SharedModule } from 'app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [OrganizationGroupsComponent, GroupListComponent, GroupFormComponent],
  imports: [RouterModule.forChild(organizationGroupsRoutes), SharedModule, NgSelectModule, TranslocoModule, MatFormFieldModule],
})
export class OrganizationGroupsModule {}

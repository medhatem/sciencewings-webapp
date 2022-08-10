import { GroupFormComponent } from './group-form/group-form.component';
import { GroupListComponent } from './group-list/group-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrganizationGroupsComponent } from './organization-groups.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { organizationGroupsRoutes } from './organization-groups.routing';

@NgModule({
  declarations: [OrganizationGroupsComponent, GroupListComponent, GroupFormComponent],
  imports: [RouterModule.forChild(organizationGroupsRoutes), SharedModule, NgSelectModule, TranslocoModule, MatFormFieldModule],
})
export class OrganizationGroupsModule {}

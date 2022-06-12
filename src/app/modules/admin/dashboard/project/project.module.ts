import { NgModule } from '@angular/core';
import { ProjectComponent } from './project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { RouterModule } from '@angular/router';
import { projectRoutes } from './project.routing';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key/find-by-key.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [ProjectComponent, ProjectListComponent],
  imports: [RouterModule.forChild(projectRoutes), FuseFindByKeyPipeModule, SharedModule, NgSelectModule, TranslocoModule, MatFormFieldModule],
})
export class ProjectModule {}

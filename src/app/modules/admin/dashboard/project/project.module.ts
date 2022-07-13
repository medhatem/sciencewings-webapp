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
import { ProjectFormComponent } from './project-form/project-form.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { constants } from 'app/shared/constants';

@NgModule({
  declarations: [ProjectComponent, ProjectListComponent, ProjectFormComponent],
  imports: [
    RouterModule.forChild(projectRoutes),
    MatDatepickerModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatFormFieldModule,
    FuseFindByKeyPipeModule,
    MatNativeDateModule,
  ],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: constants.DATE_OF_BIRTH_FORMATS }],
})
export class ProjectModule {}

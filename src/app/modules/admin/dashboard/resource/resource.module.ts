import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './profile-form/profile-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { resourceRoutes } from './resource.routing';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { MatChipsModule } from '@angular/material/chips';
import { ResourceSettingTagComponent } from './resource-setting-tag/resource-setting-tag.component';
import { ResurceSettingRuleComponent } from './resurce-setting-rule/resurce-setting-rule.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    ResourceComponent,
    ResourceProfileFormComponent,
    ResourceScheduleComponent,
    ResourceListComponent,
    ResourceSettingTagComponent,
    ResurceSettingRuleComponent,
  ],
  imports: [
    RouterModule.forChild(resourceRoutes),
    FuseFindByKeyPipeModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
})
export class ResourceModule {}

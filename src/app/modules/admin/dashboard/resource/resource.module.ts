import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './profile-form/profile-form.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { resourceRoutes } from './resource.routing';
@NgModule({
    declarations: [ResourceComponent, ResourceProfileFormComponent],
    imports: [
        RouterModule.forChild(resourceRoutes),
        FuseFindByKeyPipeModule,
        SharedModule,
        NgSelectModule,
        TranslocoModule,
        MatCardModule,
        MatButtonModule
    ],
})
export class ResourceModule { }

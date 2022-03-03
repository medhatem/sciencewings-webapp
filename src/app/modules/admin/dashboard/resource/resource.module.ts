import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { ResourceComponent } from './resource.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { resourceRoutes } from './resource.routing';

@NgModule({
  declarations: [ResourceComponent],
  imports: [
    RouterModule.forChild(resourceRoutes),
    FuseFindByKeyPipeModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
  ],
})
export class ResourceModule {}

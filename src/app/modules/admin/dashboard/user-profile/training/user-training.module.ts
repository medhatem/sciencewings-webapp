import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { UserTrainingComponent } from './user-training.component';
import { userTrainingRoutes } from './user-training.routing';

@NgModule({
  declarations: [
    UserTrainingComponent,
  ],
  imports: [
    RouterModule.forChild(userTrainingRoutes),
    TranslocoModule,
    SharedModule,
  ],
})
export class UserTrainingModule {}

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { UserProfileComponent } from './user-profile.component';
import { userProfileRoutes } from './user-profile.routing';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    RouterModule.forChild(userProfileRoutes),
    TranslocoModule,
    SharedModule
  ],
})
export class UserProfileModule {}

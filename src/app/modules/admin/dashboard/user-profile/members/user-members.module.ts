import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { UserMembersComponent } from './user-members.component';
import { userMembersRoutes } from './user-members.routing';

@NgModule({
  declarations: [
    UserMembersComponent,
  ],
  imports: [
    RouterModule.forChild(userMembersRoutes),
    TranslocoModule,
    SharedModule,
  ],
})
export class UserMembersModule {}

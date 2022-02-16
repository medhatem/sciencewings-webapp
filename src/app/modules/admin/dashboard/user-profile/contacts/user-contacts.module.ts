import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { UserContactsComponent } from './user-contacts.component';
import { userContactsRoutes } from './user-contacts.routing';

@NgModule({
  declarations: [
    UserContactsComponent,
  ],
  imports: [
    RouterModule.forChild(userContactsRoutes),
    TranslocoModule,
    SharedModule,
  ],
})
export class UserContactsModule {}

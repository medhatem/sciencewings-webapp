import { Route } from '@angular/router';
import { UserProfileResolver } from '../../../resolvers/user-profile/user-profile.resolvers';

import { UserContactsComponent } from './user-contacts.component';

export const userContactsRoutes: Route[] = [
  {
    path: '',
    component: UserContactsComponent,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

import { Route } from '@angular/router';
import { UserProfileResolver } from '../../../resolvers/user-profile/user-profile.resolvers';

import { UserMembersComponent } from './user-members.component';

export const userMembersRoutes: Route[] = [
  {
    path: '',
    component: UserMembersComponent,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

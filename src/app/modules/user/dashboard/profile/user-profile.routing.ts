import { Route } from '@angular/router';
import { UserProfileResolver } from '../../resolvers/profile/user-profile.resolvers';
import { UserProfileComponent } from './user-profile.component';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

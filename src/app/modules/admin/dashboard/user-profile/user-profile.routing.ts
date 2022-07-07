import { Route } from '@angular/router';
import { UserProfileResolver } from '../../resolvers/user-profile/user-profile.resolvers';
import { UserProfileComponent } from './user-profile.component';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    resolve: { user: UserProfileResolver },
  }
];

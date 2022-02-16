import { Route } from '@angular/router';
import { UserProfileResolver } from '../../../resolvers/user-profile/user-profile.resolvers';

import { AboutUserComponent } from './about-user.component';

export const aboutUserRoutes: Route[] = [
  {
    path: '',
    component: AboutUserComponent,
    resolve: { user: UserProfileResolver },
  },
];

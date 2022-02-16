import { Route } from '@angular/router';
import { UserProfileResolver } from '../../../resolvers/user-profile/user-profile.resolvers';

import { UserTrainingComponent } from './user-training.component';

export const userTrainingRoutes: Route[] = [
  {
    path: '',
    component: UserTrainingComponent,
    resolve: {
      data: UserProfileResolver,
    },
  },
];

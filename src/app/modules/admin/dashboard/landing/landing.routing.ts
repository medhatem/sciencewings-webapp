import { Route } from '@angular/router';
import { constants } from 'app/shared/constants';
import { LandingPageResolver } from './../../resolvers/landing-page/landing-page.resolver';
import { UserProfileResolver } from './../../resolvers/user-profile/user-profile.resolvers';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
export const landingPageRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LandingPageComponent,
        resolve: {
          data: LandingPageResolver,
        },
      },
      {
        path: constants.MODULES_ROUTINGS_CHILDREN_URLS.USER.USER_PROFILE,
        component: UserProfileComponent,
        resolve: {
          user: UserProfileResolver,
        },
      },
    ],
  },
];

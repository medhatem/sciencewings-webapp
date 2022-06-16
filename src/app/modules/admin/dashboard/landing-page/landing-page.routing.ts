import { Route } from '@angular/router';
import { LandingPageResolver } from '../../resolvers/landing-page/landing-page.resolver';
import { LandingPageComponent } from './landing-page.component';
export const landingPageRoutes: Route[] = [
  {
    path: '',
    component: LandingPageComponent,
    resolve: {
      data: LandingPageResolver,
    },
  },
];

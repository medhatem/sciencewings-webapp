import { Route } from '@angular/router';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from './core/auth/keycloak/app.guard';

export const appRoutes: Route[] = [
  // Redirect empty path to '/dashboards/profile'
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Redirect signed in user to the '/dashboards/profile'
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('app/modules/auth/forgot-password/forgot-password.module').then((m) => m.AuthForgotPasswordModule),
      },
      {
        path: 'reset-password',
        loadChildren: () =>
          import('app/modules/auth/reset-password/reset-password.module').then((m) => m.AuthResetPasswordModule),
      },
      {
        path: 'sign-in',
        loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then((m) => m.AuthSignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then((m) => m.AuthSignUpModule),
      },
    ],
  },

  // Admin routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // Dashboards
      {
        path: 'dashboards',
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('app/modules/admin/dashboards/profile/profile.module').then((m) => m.ProfileModule),
          },
        ],
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },
];

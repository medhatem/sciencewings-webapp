import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from './core/auth/keycloak/app.guard';

export const appRoutes: Route[] = [
  // Redirect empty path to '/dashboard/profile'
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

  // Redirect signed in user to the '/dashboard/profile'
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

  // Admin routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      // Dashboards
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/modules/admin/dashboard/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'project',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/modules/admin/dashboard/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'calendar',
        canActivate: [AuthGuard],
        loadChildren: () => import('app/modules/admin/dashboard/profile/profile.module').then((m) => m.ProfileModule),
      },
      { path: '**', redirectTo: '404-not-found' },
    ],
  },
];

import { Route } from '@angular/router';
import { UserProfileResolver } from '../../resolvers/user-profile/user-profile.resolvers';
import { UserProfileComponent } from './user-profile.component';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'about',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: UserProfileComponent,
    resolve: {
      data: UserProfileResolver,
    },
    loadChildren: () => import('app/modules/admin/dashboard/user-profile/about/about-user.module').then((m) => m.AboutUserModule,),
  },
  {
    path: 'contacts',
    component: UserProfileComponent,
    resolve: {
      data: UserProfileResolver,
    },
    loadChildren: () => import('app/modules/admin/dashboard/user-profile/contacts/user-contacts.module').then((m) => m.UserContactsModule,),
  },
  {
    path: 'training',
    component: UserProfileComponent,
    resolve: {
      data: UserProfileResolver,
    },
    loadChildren: () => import('app/modules/admin/dashboard/user-profile/training/user-training.module').then((m) => m.UserTrainingModule,),
  },
  {
    path: 'members',
    component: UserProfileComponent,
    resolve: {
      data: UserProfileResolver,
    },
    loadChildren: () => import('app/modules/admin/dashboard/user-profile/members/user-members.module').then((m) => m.UserMembersModule,),
  },
];

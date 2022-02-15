import { Route } from '@angular/router';

import { UserProfileResolver } from '../../resolvers/user-profile/user-profile.resolvers';
import { UserProfileComponent } from './user-profile.component';

export const userProfileRoutes: Route[] = [
  {
    path: '',
    component: UserProfileComponent,
    resolve: { user: UserProfileResolver },
    children: [
      { path: '', redirectTo: 'about', pathMatch: 'full' },
      {
        path: 'about',
        loadChildren: () => import('app/modules/admin/dashboard/user-profile/about/about-user.module').then((m) => m.AboutUserModule,)
      },
      {
        path: 'contacts',
        loadChildren: () => import('app/modules/admin/dashboard/user-profile/contacts/user-contacts.module').then((m) => m.UserContactsModule,),
      },
      {
        path: 'training',
        loadChildren: () => import('app/modules/admin/dashboard/user-profile/training/user-training.module').then((m) => m.UserTrainingModule,),
      },
      {
        path: 'members',
        loadChildren: () => import('app/modules/admin/dashboard/user-profile/members/user-members.module').then((m) => m.UserMembersModule,),
      }
    ]
  },
];

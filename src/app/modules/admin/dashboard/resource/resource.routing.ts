import { ResourceComponent } from './resource.component';
import { ResourceProfileFormComponent } from './resource-form/profile-form.component';
import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { Route } from '@angular/router';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { SettingsComponent as GeneralSettingsComponent } from './resource-settings/general/settings.component';
import { SettingsComponent as ReservationSettingsComponent } from './resource-settings/reservation/settings.component';
import { ResourceProfileComponent } from './resource-profile/resource-profile.component';
import { ResourceScheduleComponent } from './schedule/schedule.component';

export const resourceRoutes: Route[] = [
  {
    path: '',
    component: ResourceComponent,
    children: [
      {
        path: '',
        component: ResourceListComponent,
        resolve: {
          data: ResourceResolver,
        },
      },
      {
        path: 'create',
        component: ResourceProfileFormComponent,
      },
      {
        path: 'schedule',
        component: ResourceScheduleComponent,
      },
      {
        path: 'profile/:id',
        component: ResourceProfileComponent,
      },
      {
        path: 'settings/general',
        component: GeneralSettingsComponent,
      },
      {
        path: 'settings/reservation',
        component: ReservationSettingsComponent,
      },
    ],
  },
];

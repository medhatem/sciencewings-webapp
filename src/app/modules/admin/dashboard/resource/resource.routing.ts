import { ResourceGeneralSettingsComponent } from './resource-settings/general/resource-general-settings.component';
import { ReservationSettingsComponent } from './resource-settings/reservation/reservation-settings.component';
import { ResourceComponent } from './resource.component';
import { ResourceListComponent } from './resource-list-componenet/resource-list.component';
import { ResourceProfileComponent } from './resource-profile/resource-profile.component';
import { ResourceProfileFormComponent } from './resource-form/profile-form.component';
import { ResourceResolver } from '../../resolvers/resource/resource.resolvers';
import { ResourceScheduleComponent } from './schedule/schedule.component';
import { Route } from '@angular/router';

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
        path: 'schedule/:id',
        component: ResourceScheduleComponent,
      },
      {
        path: 'profile/:id',
        component: ResourceProfileComponent,
      },
      {
        path: 'settings/general',
        component: ResourceGeneralSettingsComponent,
      },
      {
        path: 'settings/reservation',
        component: ReservationSettingsComponent,
      },
    ],
  },
];

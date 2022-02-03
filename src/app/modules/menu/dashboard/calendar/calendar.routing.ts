import { Route } from '@angular/router';
import { MenuCalendarResolver } from '../../resolvers/calendar/calendar.resolvers';
import { MenuCalendarComponent } from './calendar.component';

export const menuCalendarRoutes: Route[] = [
  {
    path: '',
    component: MenuCalendarComponent,
    resolve: {
      data: MenuCalendarResolver,
    },
  },
];

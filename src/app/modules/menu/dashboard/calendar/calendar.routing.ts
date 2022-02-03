import { Route } from '@angular/router';
import { MenuCalendarResolver } from '../../resolvers/calendar/calendar.resolvers';
import { MenuCalendarComponent } from './calendar.component';

export const MenuCalendarRoutes: Route[] = [
  {
    path: '',
    component: MenuCalendarComponent,
    resolve: {
      data: MenuCalendarResolver,
    },
  },
];

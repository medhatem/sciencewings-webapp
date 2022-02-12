import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { MenuCalendarComponent } from './calendar.component';
import { menuCalendarRoutes } from './calendar.routing';

@NgModule({
  declarations: [MenuCalendarComponent],
  imports: [RouterModule.forChild(menuCalendarRoutes), TranslocoModule, SharedModule],
})
export class MenuCalendarModule {}

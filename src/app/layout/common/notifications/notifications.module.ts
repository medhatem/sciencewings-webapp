import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [RouterModule, SharedModule],
  exports: [NotificationsComponent],
})
export class NotificationsModule {}

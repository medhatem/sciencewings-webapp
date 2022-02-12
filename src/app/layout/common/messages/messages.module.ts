import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [MessagesComponent],
  imports: [RouterModule, SharedModule],
  exports: [MessagesComponent],
})
export class MessagesModule {}

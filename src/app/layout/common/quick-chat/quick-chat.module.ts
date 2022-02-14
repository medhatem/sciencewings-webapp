import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuseDrawerModule } from '@fuse/components/drawer';
import { FuseScrollbarModule } from '@fuse/directives/scrollbar';
import { SharedModule } from 'app/shared/shared.module';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';

@NgModule({
  declarations: [QuickChatComponent],
  imports: [RouterModule, FuseDrawerModule, FuseScrollbarModule, SharedModule],
  exports: [QuickChatComponent],
})
export class QuickChatModule {}

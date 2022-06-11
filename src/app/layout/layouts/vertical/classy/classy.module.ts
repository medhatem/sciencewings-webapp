import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';
import { FuseFullscreenModule } from '@fuse/components/fullscreen/fullscreen.module';
import { LanguagesModule } from 'app/layout/common/languages/languages.module';
import { MessagesModule } from 'app/layout/common/messages/messages.module';
import { NotificationsModule } from 'app/layout/common/notifications/notifications.module';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { SearchModule } from 'app/layout/common/search/search.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { ClassyLayoutComponent } from 'app/layout/layouts/vertical/classy/classy.component';
import { NewUserInfosModule } from 'app/layout/new-user-infos/new-user-infos.module';
import { SwitchOrganizationModule } from 'app/layout/common/switch-organization/switch-organization.module';
import { AppModulesModule } from 'app/layout/common/app-modules/app-modules.module';

@NgModule({
  declarations: [ClassyLayoutComponent],
  imports: [
    HttpClientModule,
    RouterModule,
    FuseFullscreenModule,
    FuseLoadingBarModule,
    FuseNavigationModule,
    LanguagesModule,
    MessagesModule,
    NotificationsModule,
    QuickChatModule,
    SearchModule,
    AppModulesModule,
    UserModule,
    SharedModule,
    SwitchOrganizationModule,
    NewUserInfosModule,
  ],
  exports: [ClassyLayoutComponent],
})
export class ClassyLayoutModule {}

import { NgModule } from '@angular/core';
import { NewUserInfosComponent } from './new-user-infos.component';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [NewUserInfosComponent],
  imports: [FuseFindByKeyPipeModule, SharedModule, NgSelectModule],
  exports: [NewUserInfosComponent],
})
export class NewUserInfosModule {}

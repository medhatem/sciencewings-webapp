import { NgModule } from '@angular/core';
import { UserComponent } from 'app/layout/common/user/user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [SharedModule],
  exports: [UserComponent],
})
export class UserModule {}

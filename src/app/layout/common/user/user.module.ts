import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from 'app/layout/common/user/user.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [UserComponent],
  imports: [RouterModule, SharedModule],
  exports: [UserComponent],
})
export class UserModule {}

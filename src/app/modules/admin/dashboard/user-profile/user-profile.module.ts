import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

import { UserProfileComponent } from './user-profile.component';
import { userProfileRoutes } from './user-profile.routing';

@NgModule({
  declarations: [UserProfileComponent, ProfileViewComponent, ProfileFormComponent],
  imports: [RouterModule.forChild(userProfileRoutes), TranslocoModule, SharedModule],
})
export class UserProfileModule {}

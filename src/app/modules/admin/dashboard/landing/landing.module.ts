import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { landingPageRoutes } from './landing.routing';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LandingComponent } from './landing.component';
import { ProfileFormComponent } from './user-profile/profile-form/profile-form.component';
import { ProfileViewComponent } from './user-profile/profile-view/profile-view.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditUserInfoComponent } from './user-profile/edit-user-info/edit-user-info.component';

@NgModule({
  declarations: [LandingComponent, LandingPageComponent, UserProfileComponent, ProfileViewComponent, ProfileFormComponent, EditUserInfoComponent],
  imports: [RouterModule.forChild(landingPageRoutes), TranslocoModule, SharedModule],
})
export class LandingModule {}

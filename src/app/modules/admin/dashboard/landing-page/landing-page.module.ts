import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { landingPageRoutes } from './landing-page.routing';
import { LandingPageComponent } from './landing-page.component';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [RouterModule.forChild(landingPageRoutes), TranslocoModule, SharedModule],
})
export class LandingPageModule {}

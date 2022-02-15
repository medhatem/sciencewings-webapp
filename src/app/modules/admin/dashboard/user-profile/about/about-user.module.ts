import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';

import { AboutUserComponent } from './about-user.component';
import { aboutUserRoutes } from './about-user.routing';

@NgModule({
  declarations: [
    AboutUserComponent,
  ],
  imports: [
    RouterModule.forChild(aboutUserRoutes),
    TranslocoModule,
    SharedModule,
  ],
})
export class AboutUserModule {}

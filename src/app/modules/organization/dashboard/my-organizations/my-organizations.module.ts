import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MyOrganizationsComponent } from './my-organizations.component';
import { MyOrganizationDetailsComponent } from './details/my-organization-details.component';
import { MyOrganizationsListComponent } from './list/my-organizations-list.component';
import { myOrganizationsRoutes } from './my-organizations.routing';

@NgModule({
  declarations: [MyOrganizationsComponent, MyOrganizationDetailsComponent, MyOrganizationsListComponent],
  imports: [
    RouterModule.forChild(myOrganizationsRoutes),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTooltipModule,
    FuseFindByKeyPipeModule,
    SharedModule,
    MatTabsModule,
  ],
})
export class MyOrganizationsModule {}

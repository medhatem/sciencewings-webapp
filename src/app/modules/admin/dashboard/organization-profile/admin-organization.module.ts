import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';
import { SharedModule } from 'app/shared/shared.module';
import { OrganizationProfileComponent } from './profile/organization-profile.component';
import { OrganizationFormComponent } from './form/organization-form.component';
import { AdminOrganizationComponent } from './admin-organization.component';
import { adminOrganizationRoutes } from './admin-organization.routing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdminOrganizationComponent, OrganizationFormComponent, OrganizationProfileComponent],
  imports: [
    RouterModule.forChild(adminOrganizationRoutes),
    MatButtonModule,
    MatSortModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatDividerModule,
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
    MatStepperModule,
    MatCheckboxModule,
    MatChipsModule,
    NgSelectModule,
    MatRadioModule,
    MatTableModule,
  ],
})
export class AdminOrganizationModule {}

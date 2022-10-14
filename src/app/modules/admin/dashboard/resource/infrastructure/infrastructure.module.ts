import { NgModule } from '@angular/core';
import { InfrastructureComponent } from './infrastructure.component';
import { InfrastructureListComponent } from './infrastructure-list/infrastructure-list.component';
import { RouterModule } from '@angular/router';
import { infrastructureRoutes } from './infrastructure.routing';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key/find-by-key.module';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslocoModule } from '@ngneat/transloco';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';
import { InfrastructureFormComponent } from './infrastructure-form/infrastructure-form.component';
import { InfrastructureSettingsModule } from './infrastructure-settings/infrastructure-settings.module';
import { SubInfrastructureSettingsComponent } from './sub-infrastructure-settings/sub-infrastructure-settings.component';

@NgModule({
  declarations: [InfrastructureComponent, InfrastructureListComponent, InfrastructureFormComponent, SubInfrastructureSettingsComponent],
  imports: [
    RouterModule.forChild(infrastructureRoutes),
    MatDatepickerModule,
    SharedModule,
    NgSelectModule,
    TranslocoModule,
    MatFormFieldModule,
    FuseFindByKeyPipeModule,
    MatNativeDateModule,
    ListComponentModule,
    InfrastructureSettingsModule,
  ],
})
export class InfrastrustureModule {}

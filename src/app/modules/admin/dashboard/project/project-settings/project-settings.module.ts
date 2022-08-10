import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { projectSettingsRoutes } from './project-settings.routing';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';
import { ListComponentModule } from '../../reusable-components/list/list-component.module';

@NgModule({
  declarations: [ProjectSettingsComponent],
  imports: [RouterModule.forChild(projectSettingsRoutes), CommonModule, MatFormFieldModule, SharedModule, TranslocoModule, ListComponentModule],
})
export class ProjectSettingsModule {}

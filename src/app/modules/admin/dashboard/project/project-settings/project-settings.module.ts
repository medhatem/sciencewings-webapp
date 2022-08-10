import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectSettingsComponent } from './project-settings.component';
import { projectSettingsRoutes } from './project-settings.routing';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ProjectSettingsComponent],
  imports: [RouterModule.forChild(projectSettingsRoutes), CommonModule, MatFormFieldModule, SharedModule, TranslocoModule],
})
export class ProjectSettingsModule {}

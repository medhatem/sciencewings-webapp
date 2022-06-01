import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppModulesComponent } from './app-modules.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  declarations: [AppModulesComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [AppModulesComponent],
})
export class AppModulesModule {}

import { ListComponent } from './list-component.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ListComponent],
  imports: [RouterModule, TranslocoModule, SharedModule],
  exports: [ListComponent],
})
export class ListComponentModule {}

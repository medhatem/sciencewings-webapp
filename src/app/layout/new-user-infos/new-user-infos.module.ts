import { NgModule } from '@angular/core';
import { NewUserInfosComponent } from './new-user-infos.component';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslocoModule } from '@ngneat/transloco';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { constants } from 'app/shared/constants';

@NgModule({
  declarations: [NewUserInfosComponent],
  imports: [FuseFindByKeyPipeModule, SharedModule, TranslocoModule, NgSelectModule],
  exports: [NewUserInfosComponent],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: constants.DATE_OF_BIRTH_FORMATS }],
})
export class NewUserInfosModule {}

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IconsModule } from 'app/core/icons/icons.module';
import { TranslocoCoreModule } from 'app/core/transloco/transloco.module';
import { TranslatePipe } from 'app/shared/pipes/transloco.pipe';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [IconsModule, TranslocoCoreModule, ToastrModule.forRoot()],
  providers: [TranslatePipe],
})
export class CoreModule {
  /**
   * Constructor
   */
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    // Do not allow multiple injections
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import this module in the AppModule only.');
    }
  }
}

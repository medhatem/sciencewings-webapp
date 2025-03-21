import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlockScrollStrategy, Overlay } from '@angular/cdk/overlay';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { SharedModule } from 'app/shared/shared.module';
import { SearchComponent } from 'app/layout/common/search/search.component';

@NgModule({
  declarations: [SearchComponent],
  imports: [RouterModule.forChild([]), SharedModule],
  exports: [SearchComponent],
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
      useFactory: (overlay: Overlay) => (): BlockScrollStrategy => overlay.scrollStrategies.block(),
      deps: [Overlay],
    },
  ],
})
export class SearchModule {}

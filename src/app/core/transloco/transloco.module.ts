import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { TranslocoHttpLoader } from 'app/core/transloco/transloco.http-loader';
import { lastValueFrom } from 'rxjs';

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      // Provide the default Transloco configuration
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          {
            id: 'fr',
            label: 'French',
          },
          {
            id: 'en',
            label: 'English',
          },
        ],
        defaultLang: 'fr',
        fallbackLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    {
      // Provide the default Transloco loader
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService],
      useFactory:
        (translocoService: TranslocoService): any =>
        (): Promise<Translation> => {
          const defaultLang = translocoService.getDefaultLang();
          translocoService.setActiveLang(defaultLang);
          return lastValueFrom(translocoService.load(defaultLang));
        },
      multi: true,
    },
  ],
})
export class TranslocoCoreModule {}

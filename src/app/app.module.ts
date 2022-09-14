import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ApiModule } from '../generated/api.module';
import { ApiService } from '../generated/services/api.service';
import { AppComponent } from 'app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { CoreModule } from 'app/core/core.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseModule } from '@fuse';
import { LayoutModule } from 'app/layout/layout.module';
import { NewUserInfosModule } from './layout/new-user-infos/new-user-infos.module';
import { appConfig } from 'app/core/config/app.config';
import { appRoutes } from 'app/app.routing';
import dayGridPlugin from '@fullcalendar/daygrid';
import { environment } from 'environments/environment';
import { initializeKeycloak } from './core/auth/keycloak/app.init';
import interactionPlugin from '@fullcalendar/interaction';
import { mockApiServices } from 'app/mock-api';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled',
};

FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApiModule.forRoot({ rootUrl: environment.apiUrl }),
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([...appRoutes], routerConfig),

    // Fuse, FuseConfig & FuseMockAPI
    FuseModule,
    FuseAlertModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,
    NewUserInfosModule,

    // 3rd party modules that require global configuration
    KeycloakAngularModule,
    FullCalendarModule,
  ],
  providers: [
    ApiService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    // cookies
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

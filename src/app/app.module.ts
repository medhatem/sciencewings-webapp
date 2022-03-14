import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { ApiModule } from '../generated/api.module';
import { ApiService } from '../generated/services';
import { AppComponent } from 'app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from 'app/core/core.module';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseModule } from '@fuse';
import { LayoutModule } from 'app/layout/layout.module';
import { appConfig } from 'app/core/config/app.config';
import { appRoutes } from 'app/app.routing';
import { initializeKeycloak } from './core/auth/keycloak/app.init';
import { mockApiServices } from 'app/mock-api';
import { environment } from 'environments/environment';
import { NewUserInfosModule } from './layout/new-user-infos/new-user-infos.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CookieService } from 'ngx-cookie-service';


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
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
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

        // cookies
        CookieService
    ],
    providers: [
        ApiService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeKeycloak,
            multi: true,
            deps: [KeycloakService],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

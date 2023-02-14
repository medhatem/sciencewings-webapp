/* eslint-disable no-console */
import { KEYCLOAK_BEARER } from '@fuse/services/config/config.constants';
import { environment } from 'environments/environment';
import { KeycloakService } from 'keycloak-angular';

export const initializeKeycloak = (keycloak: KeycloakService) => () =>
  keycloak.init({
    config: {
      url: `${environment.keycloakUrl}/auth`,
      realm: environment.sciencewingsWebRealm,
      clientId: environment.clientId,
    },
    initOptions: {
      checkLoginIframe: true,
      checkLoginIframeInterval: 25,
      /*       onLoad: 'check-sso',
       */ silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
    },
    loadUserProfileAtStartUp: true,
    enableBearerInterceptor: true,
    bearerPrefix: KEYCLOAK_BEARER,
    bearerExcludedUrls: ['/assets'],
  });

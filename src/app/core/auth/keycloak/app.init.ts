import { KEYCLOAK_TOKEN } from '@fuse/services/config/config.constants';
import { KeycloakService } from 'keycloak-angular';
import { EnvService } from '../../../environment/env.service';

export function initializeKeycloak(keycloak: KeycloakService) {
  const env = new EnvService();
  return () =>
    keycloak.init({
      config: {
        url: `${env.keycloakUrl}/auth`,
        realm: env.sciencewingsWebRealm,
        clientId: env.clientId,
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: KEYCLOAK_TOKEN,
      bearerExcludedUrls: ['/assets'],
    });
}

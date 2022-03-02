import { KEYCLOAK_BEARER } from '@fuse/services/config/config.constants';
import { KeycloakService } from 'keycloak-angular';
import { EnvService } from '../../../environment/env.service';

export const initializeKeycloak = (keycloak: KeycloakService) => {
  const env = new EnvService();
  return () =>
    keycloak.init({
      config: {
        url: `${env.keycloakUrl}/auth`,
        realm: env.sciencewingsWebRealm,
        clientId: env.clientIdLocal,
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25,
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerPrefix: KEYCLOAK_BEARER,
      bearerExcludedUrls: ['/assets'],
    });
};

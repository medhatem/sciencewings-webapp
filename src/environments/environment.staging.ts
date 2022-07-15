// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  keycloakUrl: 'https://keycloak.zonesinnovation.ca',
  // keycloakUrl: 'http://Keycloak-app-staging-env.eba-fsrexfym.ca-central-1.elasticbeanstalk.com',
  apiUrl: 'https://sciencewings-api-staging.herokuapp.com',
  swaggerUrl: 'https://sciencewings-api-staging.herokuapp.com/swagger/swagger.json',
  sciencewingsWebRealm: 'sciencewings-web',
  clientId: 'web',
  enableDebug: true,
  production: false,
  staging: true,
  local: false,
};

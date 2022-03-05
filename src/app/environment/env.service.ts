import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  keycloakUrl = 'https://keycloak-app-staging-env.eba-fsrexfym.ca-central-1.elasticbeanstalk.com';
  apiUrl = 'https://sciencewings-api-staging.herokuapp.com';
  swaggerUrl = 'https://sciencewings-api-staging.herokuapp.com/swagger/swagger.json';
  sciencewingsWebRealm = 'sciencewings-web';
  clientId = 'sciencewings-web-client';
  enableDebug = true;
  production = false;
  staging = true;
  constructor() {}
}

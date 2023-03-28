import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  keycloakUrl = 'https://keycloak.sharili.com';
  apiUrl = 'https://cirta-lab-api-staging.herokuapp.com';
  swaggerUrl = 'https://cirta-lab-api-staging.herokuapp.com/swagger/swagger.json';
  sciencewingsWebRealm = 'sharili-web';
  clientId = 'web';
  enableDebug = true;
  production = false;
  staging = true;
  constructor() {}
}

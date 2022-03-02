(function (window) {
  window.__env = window.__env || {};
  // API url
  window.__env.keycloakUrl = 'https://keycloak-app-staging-env.eba-fsrexfym.ca-central-1.elasticbeanstalk.com';
  window.__env.apiUrl = 'https://sciencewings-api-staging.herokuapp.com';
  window.__env.swaggerUrl = 'https://sciencewings-api-staging.herokuapp.com/swagger/swagger.json';
  window.__env.production = false;
  window.__env.staging = true;
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
})(this);

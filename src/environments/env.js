(function (window) {
  window.__env = window.__env || {};
  // API url
  window.__env.keycloakUrl = 'https://sciencewings-keycloak.herokuapp.com';
  window.__env.apiUrl = 'https://sciencewings-api-staging.herokuapp.com';
  window.__env.swaggerUrl = 'https://sciencewings-api-staging.herokuapp.com/swagger/swagger.json';
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
  window.__env.production = false;
  window.__env.staging = true;
})(this);

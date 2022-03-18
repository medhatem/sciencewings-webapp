/**
 * This script is used to prepare the swagger generate client side
 * Imports a swagger.json openapi 3.0 definition from a given url
 * the url to import from is set in the environments file
 * different environment files are defined depending on the environment which can be local or staging or prod
 *
 * The script expects an env to be passed to import from
 * if no env is given use local as default
 *
 */

import * as fetch from 'node-fetch';

import { writeFileSync } from 'fs';

const environments = ['staging', 'prod'];

(async () => {
  const env = process.argv[2];
  if (!env) {
    console.log('No environment passed using local as default');
  } else if (!environments.includes(env)) {
    console.log(`Invalid environment ${env} --  Valid environments are: ${environments.join(' | ')}`);
    process.exit();
  }

  const { environment } = await import(`../environments/environment${env ? `.${env}` : ''}`);
  if (!environment.swaggerUrl) {
    console.log('No swaggerUrl defined in the environments file');
    process.exit();
  }
  const swaggerFile = await fetch(environment.swaggerUrl, { method: 'get' });
  const content = await swaggerFile.json();
  writeFileSync(`${__dirname}/swagger.json`, JSON.stringify(content, null, 2));
})();

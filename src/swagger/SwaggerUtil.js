const { fstat } = require('fs');
let fetch = require('node-fetch');
let fs = require('fs');
(async () => {
  const swaggerFile = await fetch('https://sciencewings-api-staging.herokuapp.com/swagger/swagger.json', {
    method: 'get',
  });
  const content = await swaggerFile.json();
  fs.writeFileSync(`${__dirname}/swagger.json`, JSON.stringify(content, null, 2));
})();



const http = require('http');


const duplicatedPackageIds = ["63a4340669f7c36eaec924dc", "63a4340669f7c36eaec924de", "63a4340669f7c36eaec924f6", "63a4340669f7c36eaec924fc", "63a4340669f7c36eaec92516", "63a4340669f7c36eaec9251d", "63a4340669f7c36eaec9251f", "63a4340669f7c36eaec92523", "63a4340669f7c36eaec92530", "63a4340669f7c36eaec92535", "63a4340669f7c36eaec92536", "63a4340669f7c36eaec9253b"]


// Loop over the array of package IDs
for (const packageId of duplicatedPackageIds) {
  // Options for the request
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: `/packages/${packageId}`,
    method: 'DELETE'
  };

  // Make the request
  const req = http.request(options, res => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', chunk => {
      console.log(`Body: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });

  req.on('error', error => {
    console.error(`Problem with request: ${error.message}`);
  });

  req.end();
}
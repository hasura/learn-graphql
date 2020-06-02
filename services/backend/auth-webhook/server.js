// Sample webhook showing what a hasura auth webhook looks like

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const AUTH0_JWT_SECRET = process.env.AUTH0_JWT_SECRET ? process.env.AUTH0_JWT_SECRET : fs.readFileSync('./graphql-tutorials.pem');
const AUTH0_ISSUER = 'https://graphql-tutorials.auth0.com/';
const CUSTOM_JWT_SECRET = process.env.CUSTOM_JWT_SECRET;
const CUSTOM_ISSUER = 'https://hasura.io/learn/';

app.get('/', (req, res) => {
  res.send('Webhooks are running');
});

app.get('/webhook', (request, response) => {
  // Extract token from request
  let issuer;
  let decoded;
  let token;
  try {
    let auth_header = request.get('Authorization');
    token = auth_header ? auth_header.replace('Bearer ', '') : ''
    decoded = jwt.decode(token);
    if(!decoded) {
      response.status(401);
      response.send('invalid token');
      return;
    }
  } catch(e) {
    console.log(e);
    response.status(401);
    response.send('invalid token');
    return;
  }

  let hasuraVariables = {'X-Hasura-Role': 'user'};
  try {
    // check if auth0 or custom server
    issuer = decoded ? decoded.iss : null;
    if(issuer === AUTH0_ISSUER) {
      const verify = jwt.verify(token, AUTH0_JWT_SECRET, {algorithm: 'RS256'});
      hasuraVariables['X-Hasura-User-Id'] = verify['https://hasura.io/jwt/claims']['x-hasura-user-id']
      response.json(hasuraVariables);
    } else if(issuer === CUSTOM_ISSUER) {
      const verify = jwt.verify(token, CUSTOM_JWT_SECRET, {algorithm: 'RS256'});
      hasuraVariables['X-Hasura-User-Id'] = verify['https://hasura.io/jwt/claims']['x-hasura-user-id']
      response.json(hasuraVariables);
    } else {
      response.status(401);
      response.send('invalid issuer');
    }
  } catch(e) {
    console.log(e);
    response.status(401);
    response.send('error ' + e);
    return;
  }

});

// listen for requests :)
app.set('host', '0.0.0.0');
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});

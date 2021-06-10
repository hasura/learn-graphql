type authConfig = {
  domain: string,
  clientId: string,
  callbackUrl: string,
  afterLogout: string,
}

let authConfig = {
  domain: "graphql-tutorials.auth0.com",
  clientId: "P38qnFo1lFAQJrzkun--wEzqljVNGcWW",
  callbackUrl: "http://localhost:3000/callback",
  afterLogout: "http://localhost:3000",
}

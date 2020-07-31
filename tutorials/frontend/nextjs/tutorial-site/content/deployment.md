---
title: "Deployment"
metaTitle: "Deployment | Next.js GraphQL Serverless Tutorial"
metaDescription: "Deploy Next.js app to Vercel"
---

When deploying this example to `Vercel` you'll want to update the vercel.json configuration file:

```
{
  "build": {
    "env": {
      "DOMAIN": "my-website.com",
      "AUTH0_DOMAIN": "YOUR_AUTH0_DOMAIN",
      "AUTH0_AUDIENCE": "hasura",
      "AUTH0_CLIENT_ID": "YOUR_AUTH0_CLIENT_ID",
      "AUTH0_CLIENT_SECRET": "@auth0_client_secret",
      "REDIRECT_URI": "https://my-website.com/api/callback",
      "POST_LOGOUT_REDIRECT_URI": "https://my-website.com/",
      "SESSION_COOKIE_SECRET": "@session_cookie_secret"
    }
  }
}
```

Some of these values are settings and can just be added to your repository if you want. Others are actual secrets and need to be created as such using the now CLI:

```bash
vercel secrets add auth0_client_secret YOUR_AUTH0_CLIENT_SECRET
```

```bash
vercel secrets add session_cookie_secret viloxyf_z2GW6K4CT-KQD_MoLEA2wqv5jWuq4Jd0P7ymgG5GJGMpvMneXZzhK3sL
```

Pages that use Server-Side Rendering and API routes will automatically become isolated Serverless Functions. This allows page rendering and API requests to scale infinitely.

Refer to [Vercel CLI documentation](https://vercel.com/docs/cli#getting-started) for more options on configuring custom domains.

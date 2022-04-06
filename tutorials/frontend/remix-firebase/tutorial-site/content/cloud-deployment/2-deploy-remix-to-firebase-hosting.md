---
title: "Deploy Remix to Firebase Hosting"
metaTitle: "Deploy Remix to Firebase Hosting | Remix Fullstack GraphQL Tutorial"
metaDescription: "Adding Firebase hosting to our Cloud Run app gives us CDN caching"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/Dockerfile" text="Dockerfile" />

1. Run `firebase-init`, select hosting, pick your existing project, use the default public directory, and do not configure as a single-page app

1. Delete the public folder that Firebase created

1. In firebase.json, under hosting [add a rewrites value](https://firebase.google.com/docs/hosting/cloud-run#direct_requests_to_container)

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "run": {
          "serviceId": "<Your cloud run service name>"
        }
      }
    ]
  }
}
```

1. `npm run build`

1. `firebase deploy`

You should get a hosting URL back, check to see if everything worked. Notice network requests on your site should be using the Firebase CDN cache! You're done!

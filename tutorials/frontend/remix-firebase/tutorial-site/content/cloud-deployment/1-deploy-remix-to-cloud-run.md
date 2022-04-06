---
title: "Deploy Remix to Cloud Run"
metaTitle: "Deploy Remix to Cloud Run | Remix Fullstack GraphQL Tutorial"
metaDescription: "After setting up Hasura Cloud now we deploy Remix to GCP Cloud Run"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/Dockerfile" text="Dockerfile" />

Now, we deploy Remix to Cloud Run using Tom Rowe's excellent gist with slight modification. Add this Dockerfile to your project root

```dockerfile
# Credit to Tom Rowe https://gist.github.com/TheRealFlyingCoder/773bf60f433ccbdbad8c296a99fb3738

# base node image
FROM node:16-bullseye-slim as base

# Install all node_modules, including dev dependencies
FROM base as deps

RUN mkdir /app
WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install --production=false

# Setup production node_modules
FROM base as production-deps

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
ADD package.json package-lock.json ./
RUN npm prune --production

# Build the app
FROM base as build

RUN mkdir /app
WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules

ADD . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

ENV NODE_ENV=production

RUN mkdir /app
WORKDIR /app

COPY --from=production-deps /app/node_modules /app/node_modules
#My build goes to /app/server/build and i'm running /server/index.js express
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
ADD . .

CMD ["npm", "run", "start"]
```

Add a .dockerignore file in the project root

```env
hasura/
build/
public/
node_modules/
.env
.cache
.firebase
```

1. In the GCP console, enable the [Cloud Build API](https://console.cloud.google.com/marketplace/product/google/cloudbuild.googleapis.com)

2. Enable the [Cloud Run API](https://console.cloud.google.com/marketplace/product/google/run.googleapis.com)

3. Run `gcloud init` and select your Firebase project

4. `gcloud builds submit --tag gcr.io/<firebase project ID>/<any image name>`

5. In the GCP console, [create a Cloud Run service with your new image.](https://console.cloud.google.com/run/create) Allow all traffic and allow unauthenticated invocations. In variables & secrets, add these four environment variables:

- FIREBASE_ADMIN_SERVICE_ACCOUNT - from your .env without the single wrapping quotes
- GRAPHQL_ENDPOINT - Your Hasura Cloud GraphQL endpoint
- HASURA_ADMIN_SECRET - Your Hasura Cloud admin secret
- COOKIE_SECRET - a randomly generated string of letters and numbers

6. Once you've created the service Cloud Run will give you a URL. Test out your app by opening it in a web browser.

---
title: "Setup Firebase Admin"
metaTitle: "Setup Firebase Admin | Remix Fullstack GraphQL Tutorial"
metaDescription: "Now we setup Firebase Admin server side"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/utils/firebase.server.ts" text="firebase.server.ts" />

We use the Firebase Admin SDK server-side to verify our user's login JWT token and create a session cookie. Create `./app/utils/firebase.server.ts`

```typescript
import * as admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

if (admin.apps.length === 0) {
  initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT!)
    ),
  });
}

export { admin };
```

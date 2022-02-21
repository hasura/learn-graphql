---
title: "Setup Firebase Admin"
metaTitle: "Setup Firebase Admin | Remix Firebase Hasura Tutorial"
metaDescription: "Now we setup Firebase Admin server side"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/utils/firebase.server.ts" text="firebase.server.ts" />

To verify our users login JWT toke and setup our session cookie we need to use the Firebase Admin SDK server side. Create `./app/utils/firebase.server.ts`

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

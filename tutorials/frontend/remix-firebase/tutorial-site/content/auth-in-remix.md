---
title: "Setup Auth in Remix"
metaTitle: "Setup Auth in Remix | Remix Fullstack GraphQL Tutorial"
metaDescription: "Using browser cookies and Firebase auth we setup session management"
---

import GithubLink from "../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/utils/sessions.server.ts" text="sessions.server.ts" />

Create `./app/utils/sessions.server.ts`

```typescript
import { createCookieSessionStorage } from "remix";

// Learn more about cookies at MDN https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// With Firebase hosting your cookie must be named __session https://firebase.google.com/docs/hosting/manage-cache#using_cookies
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "__session",
      secrets: [process.env.COOKIE_SECRET!],
      sameSite: "lax",
      httpOnly: true,
      secure: true,
      path: "/",
      // Set session expiration to 5 days
      maxAge: 60 * 60 * 24 * 5,
    },
  });

export { getSession, commitSession, destroySession };
```

[We have .server in the file name so the compiler knows we are only using this module server side](https://remix.run/docs/en/v1/guides/constraints#server-code-pruning)

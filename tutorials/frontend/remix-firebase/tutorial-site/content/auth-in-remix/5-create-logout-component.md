---
title: "Create logout component"
metaTitle: "Create logout component | Remix Fullstack GraphQL Tutorial"
metaDescription: "We create a logout component following the Remix example"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/routes/logout.tsx" text="logout.tsx" />

Following the [Remix tutorial example](https://remix.run/docs/en/v1/tutorials/jokes#build-logout-action) we build a logout action in `./app/routes/logout.tsx`. We POST to it using a Form in `root.tsx` and include the CSRF token.

```typescript
import { ActionFunction, LoaderFunction, redirect } from "remix";
import { destroySession } from "~/utils/sessions.server";
import { admin } from "~/utils/firebase.server";
import { getSessionData } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  return redirect("/");
};

export const action: ActionFunction = async ({ request }) => {
  const { session, idToken } = await getSessionData(request, true);
  const jwtToken = await admin.auth().verifySessionCookie(idToken!);
  await admin.auth().revokeRefreshTokens(jwtToken.sub);
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
```

You now should be able to run the app `npm run dev` and test out the login/logout.

---
title: "Create Auth Helper Function"
metaTitle: "Create Auth Helper Function | Remix Fullstack GraphQL Tutorial"
metaDescription: "We Create a helper function for getting auth info"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/utils/auth.server.ts" text="auth.server.ts" />

Create `./app/utils/auth.server.ts`

```typescript
import { verifyAuthenticityToken } from "remix-utils";
import { getSession } from "./sessions.server";

export const getSessionData = async (
  request: Request,
  verifyCsrfToken = false
) => {
  const session = await getSession(request.headers.get("cookie"));
  // Optionally validate CSRF tokens https://github.com/sergiodxa/remix-utils#verify-in-the-action
  if (verifyCsrfToken) {
    // Check if the CSRF value in the Cookie matches the form value
    // https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
    await verifyAuthenticityToken(request, session);
  }
  return {
    idToken: session.get("idToken") as string | undefined,
    csrf: session.get("csrf") as string | undefined,
    session,
  };
};
```

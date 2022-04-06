---
title: "Create login component"
metaTitle: "Create login component | Remix Fullstack GraphQL Tutorial"
metaDescription: "Now we create the login component"
---

import GithubLink from "../../src/GithubLink.js";

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/frontend/remix-firebase/app-final/app/routes/login.tsx" text="login.tsx" />

We plan to have the user login via the client-side [Firebase UI component](https://github.com/firebase/firebaseui-web-react), then send up the JWT to be turned into a session cookie.

```typescript
import { useEffect } from "react";
import { ActionFunction, redirect, useSubmit } from "remix";
import {
  ClientOnly,
  createAuthenticityToken,
  unauthorized,
  useAuthenticityToken,
  useHydrated,
} from "remix-utils";
import { commitSession } from "~/utils/sessions.server";
import { admin } from "~/utils/firebase.server";
import { getSessionData } from "~/utils/auth.server";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// We need Javascript client side to run the Firebase Login component
export const handle = { hydrate: true };

export const action: ActionFunction = async ({ request }) => {
  // Get the session and verify the CSRF token
  const { session } = await getSessionData(request, true);
  const form = await request.formData();
  const idToken = form.get("idToken") as string;
  // Set session expiration to 5 days.
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  try {
    const token = await admin.auth().verifyIdToken(idToken);

    if (new Date().getTime() / 1000 - token.auth_time < 5 * 60) {
      // Create session cookie and set it.
      const cookie = await admin
        .auth()
        .createSessionCookie(idToken, { expiresIn });
      session.set("idToken", cookie);
      // Create a new CSRF token to avoid session fixation attacks
      // https://owasp.org/www-community/attacks/Session_fixation
      createAuthenticityToken(session);
      return redirect("/", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }
    // If the JWT is too old we reject it
    admin.auth().revokeRefreshTokens(token.sub);
    return new Response("Recent sign in required!", {
      status: 401,
    });
  } catch (error) {
    throw unauthorized("Token invalid");
  }
};
```

With the login component we make sure we are in the browser, not the server, and initialize Firebase using the config we got when creating the project. Once a user logs in we POST to our server with the JWT token, turn it into a session cookie, and redirect to the homepage.

For homework, implement the Firebase config using [Remix browser environment variables](https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables).

```typescript
export default function Login() {
  const submit = useSubmit();
  const csrf = useAuthenticityToken();
  // Check if we are in the browser or server
  const hydated = useHydrated();

  useEffect(() => {
    if (!firebase.apps.length)
      firebase.initializeApp(<Firebase config from create project screen>);
    // Our auth is persisted in our cookie
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  }, []);

  return (
    <ClientOnly>
      {hydated && (
        <StyledFirebaseAuth
          uiConfig={{
            // Popup signin flow rather than redirect flow.
            signInFlow: "redirect",
            callbacks: {
              // On sign in we POST our server with the JWT token
              signInSuccessWithAuthResult: (
                authResult: firebase.auth.UserCredential
              ) => {
                authResult.user?.getIdToken().then((idToken) => {
                  const formData = new FormData();
                  formData.append("idToken", idToken);
                  formData.append("csrf", csrf);
                  submit(formData, {
                    method: "post",
                    action: "/login",
                    // Don't create entry on browser history stack
                    replace: true,
                  });
                });
                return false;
              },
            },
            signInOptions: [
              firebase.auth.GoogleAuthProvider.PROVIDER_ID,
              {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                requireDisplayName: false,
              },
            ],
          }}
          firebaseAuth={firebase.auth()}
        ></StyledFirebaseAuth>
      )}
    </ClientOnly>
  );
}
```

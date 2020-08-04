---
title: "Offline mode for the webapp"
metaTitle: "Offline mode for the webapp | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "To make our app work offline, we need to get the web assets to work offline. We will make use of Create React App service worker to enable this."
---

## Offline mode for the webapp

To make our app work offline, we need to get the web assets to work offline. Create React App already has the required boilerplate for [making an app offline](https://create-react-app.dev/docs/making-a-progressive-web-app/) using [service workers](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Offline_Service_workers#Service_workers_explained).

Open `src/index.js` and change the line that says `serviceWorker.unregister()` to `serviceWorker.register()`.

Once you do this, refresh the page, go offline and refresh again. You will see that the page loads despite there being no network connection!


## Authentication in offline mode

We are using JWTs issued by Auth0 for authentication. While refreshing these tokens, we need to make sure that the user is online, otherwise the user will see a network error from Auth0. This is done in renewSession method in AppWrapper.js:

```js
 renewSession() {
   const interval = setInterval(() => {
     const shouldRenewSession = this.isLoggedIn &&
       (!this.idToken || this.isExpired());
 
     if (window.navigator.onLine && shouldRenewSession) {
       this.auth0.checkSession({}, (err, authResult) => {
         if (authResult && authResult.accessToken && authResult.idToken) {
           this.setSession(authResult);
         } else if (err) {
           this.logout();
           console.log(err);
           alert(`Could not get token (${err.error}: ${err.error_description}).`);
         }
       });
     }
   }, 5000);
 }
```



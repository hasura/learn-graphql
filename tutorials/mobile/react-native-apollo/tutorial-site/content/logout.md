---
title: "Logging out"
metaTitle: "Logging out | GraphQL React Native Apollo Tutorial"
metaDescription: "Remember to clear the Apollo cache before logging out. You can use the instance of Apollo client to do so."
---


import GithubLink from "../src/GithubLink.js";

Remember to clear the Apollo cache before logging out. You can use the instance of Apollo client to do so.

<GithubLink link="https://github.com/hasura/learn-graphql/blob/master/tutorials/mobile/react-native-apollo/app-final/src/screens/LogoutScreen.js" text="LogoutScreen.js"/>

```js
client.resetStore();
```
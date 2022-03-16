---
title: "Apollo useSubscription hook"
metaTitle: "Apollo useSubscription hook | GraphQL React Native Apollo Tutorial"
metaDescription: "The easiest way to bring live data to your UI is using the `useSubscription` hook from `@apollo/react-hooks`"
---

The easiest way to bring live data to your UI is using the `useSubscription` hook from `@apollo/react-hooks`. This lets you render the stream of data from your service directly within your component! One thing to note, subscriptions are just listeners, they don’t request any data when first connected, but only open up a connection to get new data.

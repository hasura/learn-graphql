---
title: "Apollo Smart Subscription"
metaTitle: "Vue Apollo Smart Subscription | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "The easiest way to bring live data to your Vue app UI is using the Smart Subscription from vue-apollo, apollo.$subscribe"
---

The easiest way to bring live data to your UI is using the `useSubscription()` method from `@vue/apollo-composable`. Each subscription created with `useSubscription()` in a component results in the creation of a reactive subscription object.

One thing to note, subscriptions in `vue-apollo` are just listeners, they don’t request any data when first connected, but only open up a connection to get new data. But in Hasura GraphQL Engine, subscriptions are live queries. The initial request gives back data, if any, for the subscription.
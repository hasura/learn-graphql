---
title: "Course Introduction"
metaTitle: "Course Introduction | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "A powerful and concise tutorial that will show you how to build an offline first app with React, RxDB and Hasura GraphQL."
---

In this course, we will look at how to make a web app offline first using a client-side database
that is synced securely with Postgres.
We'll be using two open-source tools, RxDB and Hasura to help set up the sync. We will be using Auth0 for Authentication though other tools like Firebase, AWS Cognito or AuthGuardian should also work perfectly well.

## Key topics and takeaways:

- What is an offline first app?
- Using service workers to make code offline first
- Using RxDB to make data offline first
- Authentication & Authorization for offline first apps

## What will we be building?
We will be building a realtime todo application using authenticated GraphQL APIs.

Try this deployed version of the app to see what we'll be building: https://rxdb-hasura-demo.netlify.app/

### Try out the sync:

- Login to the app from two different browsers.
- Create some todos in one and watch as they get synced to the other (Note: This might not work in a private window on firefox due to this [bug](https://bugzilla.mozilla.org/show_bug.cgi?id=781982)).

### Try out the offline-first:
- On  browser 1: Simulate offline mode using the "Work offline" option under File menu on firefox or devtools on chrome.
- On browser 1: Create/edit/delete todos in offline mode. You'll see that nothing has changed on browser 2.
- On browser 1: Go back online. You'll see that browser 2 gets synced!

You can also go offline and refresh the page and see that data is persisted offline too.

## What do I need to take this tutorial?
You need to have npm/yarn & node 8+ running. We will also assume you are familiar with React, GraphQL and Hasura. If you are new to these we recommend going through these courses first:

- [GraphQL Basics](https://hasura.io/learn/graphql/intro-graphql/introduction/)
- [Hasura Basics](https://hasura.io/learn/graphql/hasura/introduction/)
- [React + Apollo](https://hasura.io/learn/graphql/react/introduction/)


## How long will this tutorial take?
Less than 2 hours.

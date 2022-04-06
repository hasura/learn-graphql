---
title: "Optimistic UI updates after mutations"
metaTitle: "Optimistic UI updates after mutations | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "We will use the Apollo Client Optimistic Response to perform UI updates after a GraphQL mutation in the Vue app"
---

We can notice that there is a lag when users create a todo.
We can also create UIs where the UI updates optimistically, assuming
that the mutation will be successful.

Let's use optimistic updates for toggling and deleting todos.

We will learn the following concepts:

- Creating a GraphQL mutation
- Using the Mutation with $apollo.mutate
- Capturing loading/finished/error states
- Use optimistic responses

Let's get started!

---
title: "Handle loading/errors"
metaTitle: "Vue Apollo Error Handling | GraphQL Vue 3 Apollo Tutorial"
metaDescription: "We will handle the GraphQL loading and error states using the Vue Apollo properties and hooks - loading and error "
---

As we saw in the previous step, Apollo gives access to properties and hooks to handle `loading` and `error` states. These are common ones that you will need to handle in your app.

Now let's go back to the template that exists and add a loading state.
In `src/components/TodoPrivateList.vue`, let's make the following modifications.

```js
<template>
    <div>
+        <div v-if="privateTodosQuery.loading?.value">Loading...</div>
         <div class="todoListwrapper">
            <TodoItem :todos="state.filteredTodos" :type="state.type" />
         </div>
```

When this component mounts, the GraphQL query sent in the background may not have been completed. But we need to handle that temporary state of no data and hence we return some useful text during `loading` state. 
In this loading state, typically you can do fancy things like displaying a loading spinner.

Now, the query could also end up in an `error` state due to various reasons. Sometimes the graphql query could be wrong, or the server isn't responding. Whatever may be the reason, the user facing UI should show something to convey that an error has occurred. 
In this error state, typically you can send these error messages to third-party services to track what went wrong.

So let's add some code to handle errors. 

```javascript
<template>
    <div>
        <div v-if="privateTodosQuery.loading?.value">Loading...</div>
+        <div v-if="privateTodosQuery.error?.value">
+            Error: {{ privateTodosQuery.error?.value?.message }}
+        </div>
        <div class="todoListwrapper">
            <TodoItem :todos="state.filteredTodos" :type="state.type" />
        </div>
```


Of course this is just a basic implementation of error handling. Now depending upon the error codes the server returns, you can show different messages to the user.

All said and done, these are two important states that need to be handled inside your component. What you have written above is basic, but sufficient for this tutorial.

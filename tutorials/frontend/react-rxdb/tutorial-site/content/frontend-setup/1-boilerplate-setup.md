---
title: "Boilerplate Setup"
metaTitle: "Clone and run the boilerplate | React + RxDB + Hasura GraphQL Tutorial"
metaDescription: "We will clone the boilerplate for rxdb-hasura-demo and setup auth0 variables to start running the app"
---

## Boilerplate

The boilerplate for this app can be downloaded and run as follows:

```bash
$ git clone https://github.com/hasura/rxdb-hasura-demo.git
$ cd rxdb-hasura-demo
$ git checkout boilerplate
$ npm install
$ npm start
```

Now update the configuration in `src/components/auth0-variables.js` to match your auth0 domain settings:

```js
export const AUTH_CONFIG = {
  domain: '<auth0-domain>',
  clientId: '<auth0-client-id>',
  callbackUrl: 'http://localhost:3000/callback'
};
```

At this point, you will be able to login, and see an empty todo list, but you won’t be able to add any todos. That is because the functionality required to add a todo to a store, fetch todos from the store, etc has been left unimplemented in the boilerplate.

## Boilerplate code structure walkthrough

All the files we will be dealing with are under src/components/. The key files are:

- App.js: The parent react component that renders the page
- AppWrapper.js: Wrapper around App.js that takes care of authentication
- Todo/TodoItem.js: Component to render a single todo item
- Todo/TodoFilter.js: Component to allow user to toggle between active, completed and all todos
- Todo/TodoList.js: Component to render the list of todo items and filters
- Todo/TodoInput.js: Input box to create new Todo
- Todo/TodoListWrapper.js: Wrapper around TodoList and TodoInput

---
title: "Boilerplate Setup"
metaTitle: "Clone and run the boilerplate | React + RxDB + Hasura tutorial"
metaDescription: "A powerful and concise tutorial that will show you how to build an offline first app with RxDB and Hasura."
---

## Boilerplate

The boilerplate for this app can be downloaded and run as follows:

git clone https://github.com/hasura/rxdb-hasura-demo.git
git checkout boilerplate
Update auth0 configuration in src/components/auth0-variables.js
Run npm install
Run npm start

At this point, you will be able to login, and see an empty todo list, but you won’t be able to add any todos. That is because the functionality required to add a todo to a store, fetch todos from the store, etc has been left unimplemented in the boilerplate.

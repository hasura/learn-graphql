---
title: "Authentication Overview"
metaTitle: "Authentication and Authorization with Hasura | GraphQL Unity Hasura Tutorial"
metaDescription: "This part covers authentication, allowing our players to be unique users."
---

In almost every game, a player needs an identity. They assume this identity and can access resources they have access to.

This is done by authentication.

For this tutorial, we're going to have a very simple authentication process. For other purposes, this might not be ideal and proper auth services should be utilized like [Auth0](https://auth0.com/), [Firebase](https://firebase.google.com/docs/auth) or a custom backend.

Interfacing Unity with these services is a tutorial in itself so for this, we're going to use a GraphQL service I created and hosted on [Glitch](https://glitch.com/)

You'll clone this service and add in your own project secrets!

The service has one Query, `GetJWT(id: Int!, username: String, password: String)` which takes in a users `id`, `username` and `password`, cross checks it with our Hasura backend and returns a signed [`jwt`](https://jwt.io/introduction/)

We shall then use this token in all our subsequent requests to our Hasura backend. Without a valid token, our Hasura backend will not return any data.

The whole authentication process goes thus:

For a new user
- User starts the game and Unity queries `GetJWT` with a mock user's id, username and password.
- The token returned is set as the `Authentication` header for all our further requests,
- Before being allowed to play online, User is asked to create a profile.
- User provides their preferred username.
- A random password is generated and the username and password are used to create a new entry in our `users` table in our Hasura backend.
- The `id` of the newly created user is returned and the `id`, `username`, and `password` are sent to `GetJWT` to get a new token for this new user.
- The `id`, `username` and `password` are also stored in [`PlayerPrefs`](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html).
- The new token is set as our new `Authentication` header for subsequent requests.

For a returning user
- We check `PlayerPrefs` for the `id`, `username` and `password` of the user.
- We send these to `GetJWT` and get a jwt returned.
= The token is set as our `Authenttication` header for subsequent requests.

Of course, this method of authentication has some problems but it is ideal for this tutorial.

You can learn a bit more about [Authentication with Hasura](https://hasura.io/learn/graphql/hasura/authentication/)
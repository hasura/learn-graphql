---
title: "JWT Provider Service"
metaTitle: "JWT Provider Service | Hasura GraphQL Tutorial"
metaDescription: "Creating a simple Glitch project to handle jwt provision"
---

Since setting up Auth0 or Firebase with Unity is a process in itself, we'd be setting up our own custom jwt provider!

It doesn't have the many useful features but it gets the job done. Let's get into it.

### Glitch Set Up

I already created a Glitch project for this. You'll just be cloning it and editing it a bit.

Open the link here:  https://glitch.com/edit/#!/shooter-arena-jwt

Click `Remix To Edit` to make it your own project. It should be at the top right corner.

![Remix to Edit](./media/remix.jpg)

**Note**: it is advisable you create a Glitch account, if not your project would be deleted after 5 days.

Go to `index.js` file and in `function postRequest(id, success)` change the `hostname` to your hasura backend url.

![Hostname](./media/url-change.jpg)

You can get your hostname from your Hasura console.

![url](./media/url.jpg)

Next up, go to the `.env` file to set your secrets.

```text
SECRET=ADMIN_SECRET
CLIENT_TOKEN=CLIENT_TOKEN
PRIVATE_KEY=JWTSecretMustBeAtLeast32CharactersLong!
```

`SECRET` should be set to your Hasura admin secret
`CLIENT_TOKEN` should be set to a phrase you want to use to authorize Unity.
`PRIVATE_KEY` should be set to the HASURA_GRAPHQL_JWT_SECRET you set in Heroku.

![env](./media/env.jpg)

Next, rename your project.

![Project name](./media/rename-glitch.jpg)

Copy the live app link.

![Live app](./media/share-live-app.jpg)

And let's head over to Unity.

### Getting our JWT

Open your Unity project and create a new `Api Reference`. You can name it `JWT`

Paste the Glitch live app link you copied in the url slot and `Introspect`.

![Introspect](./media/jwt-api-reference.jpg)

Create a new query called `GetJwt`

![GetJwt](./media/get-jwt.jpg)

And that's it. Calling this query with the right arguments will return a jwt for us to authenticate our Api calls with.
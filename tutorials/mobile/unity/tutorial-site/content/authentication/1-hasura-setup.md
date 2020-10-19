---
title: "Hasura Setup"
metaTitle: "Hasura Authentication Setup | GraphQL Unity Hasura Tutorial"
metaDescription: "Setting up Hasura for authentication"
---

Alright, we're about to begin our foray into authentication with Hasura.

First off, we need to do some set up.

### Config Variables

Since we have deployed Hasura GraphQL Engine on Hasura Cloud, let's head to [Hasura Cloud Dashboard](https://cloud.hasura.io/?pg=learn-unity&plcmt=body&tech=default) to configure the JWT secret. 

Open the Hasura Cloud dashboard and head to the "Env vars" page for your Hasura Cloud project:

![Hasura ENV Config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

Click on `+ New Env Var` to add a new environment variable.

Add a new Config Var called `HASURA_GRAPHQL_JWT_SECRET`, and copy and paste the json below into the value box.

```json
{
  "type": "HS256",
  "key": "JWTSecretMustBeAtLeast32CharactersLong!"
}
```

You should end up with something like the following:

Replace the key with any key you want but it must be at least 32 characters long.

You should end up with something like the following:

![JWT Secret ENV](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/jwt-secret-env.png)

### Permissions and Roles

Next up, go to your Hasura console. Refresh it if it was already open. You'd be asked to login to Hasura Cloud Dashboard.

Next up, go to the `Data` tab and click the `users` table.

We shall add another column called 

`password` (String, nullable)

![Password column](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/add-password.jpg)

Go to `Insert Row` and add another mock user

![Mock user](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/mock-user.jpg)

Next, go to the `Permissions` tab and create a new role called `user`

Set Insert, Update, Select, and Delete permissions

![Users Insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/user-insert.jpg)
Insert

![Users Select](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/user-select.jpg)
Select

![Users Delete](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/user-delete.jpg)
Delete

![Users Update](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/user-update.jpg)
Update

The Update permissions can also be set by using this line of code

`{"id":{"_eq":"X-Hasura-User-Id"}}`

Go to permissions in `battles`

Set Insert, Update, Select, and Delete permissions

![Battles Insert](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/battle-insert.jpg)
Insert

![Battles Select](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/battle-select.jpg)
Select

![Battles Delete](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/battle-delete.jpg)
Delete

![Battles Update](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/battle-update.jpg)
Update

The Update permissions can also be set by using this line of code

`{"_or":[{"_or":[{"shooter_id":{"_is_null":true}},{"shooter_id":{"_eq":"X-Hasura-User-Id"}}]},{"_or":[{"defender_id":{"_is_null":true}},{"defender_id":{"_eq":"X-Hasura-User-Id"}}]}]}`

Go to permissions in `old_battles`

Set Select and Delete permissions

![Old Battles Select](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/old-battles-select.jpg)
Select

![Old Battles Delete](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/old-battles-delete.jpg)
Delete

Go to  permissions in `online_battles`

Set Select permissions

![Online Battles Select](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-unity/authentication/online-battles-select.jpg)
Select

And that's it. Those are the permissions set up for our Shooter Arena game. Next up, we set up our jwt service provider on glitch.


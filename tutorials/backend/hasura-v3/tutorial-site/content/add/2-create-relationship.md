---
title: "Create relationship"
metaTitle: "Create a relationship | Hasura v3 Tutorial"
metaDescription: "In this section, we'll cover how to create a relationship across subgraphs."
---

## Create relationships across subgraphs

Finally, we'll create a relationship between entities in our different subgraphs. Our Chinook data source is a
music-based dataset that contains a type called `Artist`. We have a `favorite_artist` colum on our `app_users` table.

In `/app/app_connector/models/Users.hml`, let's add the following relationship:

```yaml
---
kind: Relationship
version: v1
definition:
  name: user_to_favorite_artist
  source: Users
  target:
    model:
      subgraph: chinook
      name: Artist
      relationshipType: Object
  mapping:
    - source:
        fieldPath:
          - fieldName: favoriteArtist
      target:
        modelField:
          - fieldName: artistId
```

**Remember, you can use LSP to assist in authoring metadata.**

While you can copy and paste the value above, don't forget that LSP is available to assist you when writing your own
relationships, permissions, and any other metadata-authoring tasks you'll need to complete.

We can then run the following query and see that — rightly so — everyone's favorite artist is `AC/DC` 🤘

```graphql
query MyQuery {
  app_users {
    name
    user_to_favorite_artist {
      name
    }
  }
}
```

![Everyone's favorite of AC/DC](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/beta/0.0.1_console_ac-dc.png)

## What just happened?

We created a second subgraph called `chinook` and added a completely separate data source using the `chinook_connector`.
We then created a relationship across these subgraphs to link disparate tables and make them available via a single
query. We can even visualize this using the console's explorer, available in the left-hand navigation.

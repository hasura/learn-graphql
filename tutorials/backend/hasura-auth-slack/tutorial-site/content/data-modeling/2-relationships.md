---
title: "Relationships"
metaTitle: "Relationships | Hasura Auth Slack Tutorial"
metaDescription: " Object and Array Relationships for Slack Clone"
---

Relationships enable you to make nested object queries if the tables/views in your database are connected. 

GraphQL schema relationships can be either of

- [object relationships (one-to-one)](https://hasura.io/docs/latest/schema/common-patterns/data-modeling/one-to-one/)
- [array relationships (one-to-many)](https://hasura.io/docs/latest/schema/common-patterns/data-modeling/one-to-many/)

## Object Relationships {#object-relationships}

Let's say you want to query `workspace` and more information about the `user` who created it. This is achievable using nested queries if a relationship exists between the two. This is a one-to-one query and hence called an object relationship.

An example of such a nested query looks like this:

```graphql
query {
  workspace {
    id
    name
    owner {
      id
      name
    }
  }
}
```

In a single query, you are able to fetch workspace and its related user information. This can be very powerful because you can nest to any level.

## Array Relationships {#array-relationships}

Let's look at an example query for array relationships.

```graphql
query {
  users {
    id
    name
    messages {
      id
      message
      channel_id
    }
  }
}
```

In this query, you are able to fetch users and for each user, you are fetching the messages (multiple) sent by that user. Since a user can have multiple messages, this would be an array relationship.

Relationships can be captured by foreign key constraints. Foreign key constraints ensure that there are no dangling data.
Hasura Console automatically suggests relationships based on these constraints.

Though the constraints are optional, it is recommended to enforce these constraints for data consistency.

The above queries won't work yet because we haven't defined the relationships yet. But this gives an idea of how nested queries work.
---
title: "Create Type Permissions"
metaTitle: "Create users table permissions | Hasura v3 Tutorial"
metaDescription: "In this section, we'll cover how to set up permissions for the users table for select operations."
---

We can also set permissions for which fields a role can access by setting `TypePermissions`.

## Add TypePermissions

We can then modify the `TypePermissions` in the same file to the following:

```yaml
---
kind: TypePermissions
version: v1
definition:
  typeName: Users
  permissions:
    - role: admin
      output:
        allowedFields:
          - createdAt
          - email
          - favoriteArtist
          - id
          - isEmailVerified
          - lastSeen
          - name
          - password
          - updatedAt
    - role: user
      output:
        allowedFields:
          - email
          - favoriteArtist
          - id
          - name
          - password
```

Since the CLI should still be running in `dev` mode, as we make our changes it will create a new build automatically.
When our build is ready, we can add the following headers in our project's Console:

| Key                | Value                                  |
| ------------------ | -------------------------------------- |
| `x-hasura-role`    | `user`                                 |
| `x-hasura-user-id` | `7cf0a66c-65b7-11ed-b904-fb49f034fbbb` |

If we re-run the same query as before, Hasura will parse these values and apply our permissions, returning only Sean's
data and only the fields he access to under the `user` role:

![Execute a query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/beta/0.0.1_console_query-with-permissions.png)

Just like that, we've defined who can access the `users` model and what data they can access 🎉

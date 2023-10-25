---
title: 'Create Type Permissions'
metaTitle: 'Create users table permissions | Hasura v3 Tutorial'
metaDescription: "In this section, we'll cover how to set up permissions for the users table for select operations."
---

We can also set permissions for which fields a role can access by setting `TypePermissions`.

## Set fields for the user role

Begin by finding this section of your `metadata.hml`:

```yaml
kind: TypePermissions
version: v1
definition:
  typeName: users
  permissions:
    - role: admin
      output:
        allowedFields:
          - created_at
          - email
          - id
          - is_email_verified
          - last_seen
          - name
          - password
          - updated_at
```

As we can see, the `admin` role has access to all fields. We'll create a new role called `user` and only allow them to
access the `id`, `name`, and `email` fields.

Our complete `TypePermissions` section for the `users` type should look like this:

```yaml
kind: TypePermissions
version: v1
definition:
  typeName: users
  permissions:
    - role: admin
      output:
        allowedFields:
          - created_at
          - email
          - id
          - is_email_verified
          - last_seen
          - name
          - password
          - updated_at
    - role: user
      output:
        allowedFields:
          - email
          - id
          - name
```

## Test the user role with a new build

As we've made modifications to our metadata, we'll need to create a new build. Like before, run the following to create
a new build:

```bash
hasura3 cloud build create --project ./hasura.yaml --description "Set type permissions for users"
```

Head to the [Console](https://console.hasura.io) and select the newest build. With the pre-configured headers, run the
following query:

```graphql
query GetUsers {
  users {
    id
    name
    email
    is_email_verified
    created_at
    updated_at
  }
}
```

You should see a response like this:

```json
{
  "data": {
    "users": [
      {
        "id": "7cf0a66c-65b7-11ed-b904-fb49f034fbbb",
        "name": "Sean",
        "email": "seandemo@hasura.io",
        "is_email_verified": false,
        "created_at": "2023-08-09T19:05:44.828757+00:00",
        "updated_at": "2023-08-09T19:05:44.828757+00:00"
      },
      {
        "id": "82001336-65b7-11ed-b905-7fa26a16d198",
        "name": "Rob",
        "email": "robdemo@hasura.io",
        "is_email_verified": false,
        "created_at": "2023-08-09T19:05:44.828757+00:00",
        "updated_at": "2023-08-09T19:05:44.828757+00:00"
      },
      {
        "id": "86d5fba0-65b7-11ed-b906-afb985970e2e",
        "name": "Marion",
        "email": "mariondemo@hasura.io",
        "is_email_verified": false,
        "created_at": "2023-08-09T19:05:44.828757+00:00",
        "updated_at": "2023-08-09T19:05:44.828757+00:00"
      },
      {
        "id": "8dea1160-65b7-11ed-b907-e3c5123cb650",
        "name": "Sandeep",
        "email": "sandeepdemo@hasura.io",
        "is_email_verified": false,
        "created_at": "2023-08-09T19:05:44.828757+00:00",
        "updated_at": "2023-08-09T19:05:44.828757+00:00"
      },
      {
        "id": "9bd9d300-65b7-11ed-b908-571fef22d2ba",
        "name": "Abby",
        "email": "abbydemo@hasura.io",
        "is_email_verified": false,
        "created_at": "2023-08-09T19:05:44.828757+00:00",
        "updated_at": "2023-08-09T19:05:44.828757+00:00"
      }
    ]
  }
}
```

Now, at the top of the Console, let's add two headers to our request:

| Header             | Description                                   | Value                                  |
| ------------------ | --------------------------------------------- | -------------------------------------- |
| `x-hasura-role`    | The role that we want to use for this request | `user`                                 |
| `x-hasura-user-id` | The user ID that we want to use for this role | `7cf0a66c-65b7-11ed-b904-fb49f034fbbb` |

When Hasura sees these headers, it will evaluate the `user` role and apply the filter that we defined. Add the headers,
refresh the page, and run this query:

```graphql
query GetUsers {
  users {
    id
    name
    email
  }
}
```

You should see a response like this:

```json
{
  "data": {
    "users": [
      {
        "id": "7cf0a66c-65b7-11ed-b904-fb49f034fbbb",
        "name": "Sean",
        "email": "seandemo@hasura.io"
      }
    ]
  }
}
```

If you try to add back the `is_email_verified`, `created_at`, and `updated_at` fields, you'll see that they are
unavailable to the `user` role. That's because Hasura automatically generates a different schema reflecting which fields
are available to the specified role.

Just like that, we've defined who can access the `users` model and what data they can access 🎉

---
title: 'Create Model Permissions'
metaTitle: 'Create permissions for models | Hasura v3 Tutorial'
metaDescription: "In this section, we'll cover how to set up permissions for the users model for select operations."
---

We'll begin by creating `ModelPermissions` for the `users` model. We'll create a `user` role and add a filter that will
only allow users to see their own information.

## Create a user role {#model-permissions}

Begin by finding the following section in `metadata.hml`:

```yaml
kind: ModelPermissions
version: v1
definition:
  modelName: users
  permissions:
    - role: admin
      select:
        filter: null
```

Each model has a `ModelPermissions` section that defines which roles can access the model and what filters are applied
to the model.

You'll see that there are already permissions for the `admin` role that evaluate to `null`. This means that the `admin`
role has full access to the `users` model. We'll create a new role called `user` and add a filter that will check the
value of the `id` field and compare it against a session variable called `x-hasura-user-id` that we'll pass a header in
our requests.

Our complete `ModelPermissions` section for the `users` model should look like this:

```yaml
kind: ModelPermissions
version: v1
definition:
  modelName: users
  permissions:
    - role: admin
      select:
        filter: null
    - role: user
      select:
        filter:
          fieldComparison:
            field: id
            operator: _eq
            value:
              sessionVariable: x-hasura-user-id
```

When working with your own models, you can leverage the power of the Hasura VS Code extension to generate these
permissions using autocomplete.

Next, we'll check out how we can restrict access to specific **fields** based on role.

---
title: 'Create a Command Permission'
metaTitle: 'Create a Command Permission | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Create a command permission to allow a user to use the command.'
---

With watch mode still running, open the `subgraphs/default/commands` directory. You'll see two files here: one for the
`greeting()` function we wrote earlier and one for the `hello()` function that was part of the boilerplate created by
the CLI. Open the `greeting.hml` file and modify it to look like this:

```yaml
kind: CommandPermissions
version: v1
definition:
  commandName: greeting
  permissions:
    - role: admin
      allowExecution: true
    - role: user
      allowExecution: true
```

That's it? Yep! As the `admin` role already has permission to execute all commands, we only need to add the `user` role
to the list of roles that can execute the `greeting()` command. Save the file and watch mode will automatically
recompile the subgraph and update the supergraph.

You can head to your Console and try out the command with the `x-hasura-role` header set to `user`:

![Supergraph Visualization](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/backend-stack/v3/supergraph-course/command-permission-query.png)

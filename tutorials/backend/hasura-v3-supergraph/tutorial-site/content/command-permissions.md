---
title: 'Command Permissions'
metaTitle: 'Command Permissions | Hasura v3 Supergraph Modeling Tutorial'
metaDescription: 'Learn how to create a command permission to allow a user to use a command.'
---

You'll remember from our [intro v3 course](https://hasura.io/learn/graphql/hasura-v3/introduction/) that Hasura
primarily uses two types of permissions: ModelPermissions and TypePermissions. However, there is a third type of
permission that is used to control access to custom business logic: CommandPermissions.

CommandPermissions work in the same way as ModelPermissions and TypePermissions, but they are used to control access to
custom business logic. In this section, we'll create a CommandPermission that will allow a user to use the command we
created in the previous lesson.

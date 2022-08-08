---
title: "Autenticación lista para la producción"
metaTitle: "Autenticación lista para la producción | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Esta parte del tutorial le enseñará cómo configurar las listas de permitidos para que pueda estar listo para la producción con Hasura GraphQL"
---

La API de GraphQL de Hasura expone una serie de consultas a los administradores y a los usuarios regulares de la aplicación. Los permisos están claramente definidos para cada rol. Pero además de esto, puede especificar exactamente una lista de consultas que deberían ejecutarse.

La lista de permitidos es una lista de consultas seguras (consultas, mutaciones o suscripciones de GraphQL) que el motor de GraphQL almacena en los metadatos.

Puede activar las listas de permitidos a través de la variable de entorno denominada `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

![Configuración de env de lista de permisos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/enable-allowlist-env.png)

En la aplicación de Slack tenemos una serie de consultas y mutaciones que pueden formar una lista y se permite que el servidor ejecute solo esos.

Por ejemplo, algunas de las consultas necesarias para la aplicación de slack son

- Buscar la lista de espacios de trabajo de los que un usuario es parte

```graphql
query {
  users {
    workspaces {
      id
      name
    }
  }
}
```

- Buscar la lista de canales en un espacio de trabajo

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp) {
  channel(where: {workspace_id: $workspaceId}) {
    id
    name
    created_by
  }
}
```

Tenga en cuenta que esto utiliza variables y por lo tanto se permitirá la misma consulta con diferentes valores para las variables.

- Buscar la lista de mensajes publicados en un canal

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp, $offset: Int!) {
  channel(where: {workspace_id: $workspaceId}, limit: 20, offset: $offset) {
    id
    name
    channel_threads {
      channel_thread_messages {
        id
        message
      }
    }
  }
}
```

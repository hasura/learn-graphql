---
title: "Producción Preparada"
metaTitle: "Producción Preparada Auth | Hasura Auth Slack Tutorial"
metaDescription: "Esta parte del tutorial te enseñará a configurar Permitir listas para que puedas ir a la producción preparada con Hasura GraphQL"
---

La API de Hasura GraphQL expone una serie de consultas a los administradores y usuarios regulares de la aplicación. Los permisos están claramente definidos para cada rol. Pero además de estos, puede especificar exactamente una lista de consultas que deben ser ejecutadas.

La lista de permisos es una lista de consultas seguras (consultas de GraphQL, mutaciones o suscripciones) que el motor GraphQL almacena en sus metadatos.

Puede habilitar Permitir listas a través de la variable de entorno llamada `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

![Permitir la configuración de lista env](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/enable-allowlist-env.png)

En la aplicación Slack tenemos una serie de consultas y mutaciones que pueden ser enumeradas y solo las pueden ser permitidas para ser ejecutadas por el servidor.

Por ejemplo, algunas de las consultas requeridas para la aplicación slack son

- Busque la lista de espacios de trabajo de los que un usuario forma parte

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

- Busca la lista de canales en un espacio de trabajo

```graphql
query getChannelsInWorkspace($workspaceId: uuid_comparison_exp) {
  channel(where: {workspace_id: $workspaceId}) {
    id
    name
    created_by
  }
}
```

Tenga en cuenta que esto utiliza variables y por lo tanto la misma consulta con diferentes valores para variables será permitida.

- Busque la lista de mensajes publicados en un canal

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

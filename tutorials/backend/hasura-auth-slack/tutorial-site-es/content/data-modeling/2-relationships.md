---
title: "Relaciones"
metaTitle: "Relaciones | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Relaciones de objetos y matriz para el clon de Slack"
---

Las relaciones le permiten hacer consultas de objetos anidados si las tablas/vistas en la base de datos están conectadas.

Las relaciones de esquema de GraphQL pueden ser

- relaciones de objetos (uno a uno)
- relaciones de matriz (uno con muchos)

## Relaciones de objetos {#object-relationships}

Digamos que desea consultar `workspace` y más información sobre el `user` que lo creó. Esto es posible utilizando consultas anidadas si existe una relación entre los dos. Esta es una consulta uno a uno y por lo tanto llamada una relación de objeto.

Un ejemplo de una consulta anidada se parece a esto:

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

En una única consulta, puede buscar el espacio de trabajo y su información de usuario relacionada. Esto puede ser muy potente porque puede anidar a cualquier nivel.

## Relaciones de matriz {#array-relationships}

Veamos un ejemplo de consulta para las relaciones de matriz.

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

En esta consulta, puede buscar usuarios y para cada usuario, está buscando los (varios) mensajes que envió ese usuario. Como un usuario puede tener varios mensajes, esta sería una relación de matriz.

Las relaciones pueden ser capturadas por restricciones de clave extranjera. Las restricciones de clave extranjera aseguran que no haya datos pendientes.
La consola de Hasura sugiere automáticamente relaciones según estas restricciones.

Aunque las restricciones son opcionales, se recomienda hacer cumplir estas restricciones para la consistencia de datos.

Las consultas anteriores no funcionarán aún porque no hemos definido las relaciones todavía. Pero esto da una idea de cómo funcionan las consultas anidadas.
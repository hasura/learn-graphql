---
title: Suscripciones - Actualizaciones en tiempo real
metaTitle: "Suscripciones de GraphQL para los datos en tiempo real | Tutorial de GraphQL"
metaDescription: "Pruebe la suscripción de GraphQL utilizando GraphiQL. Un ejemplo de suscripciones de GraphQL para buscar datos en vivo que son insertados por los websockets"
---

La especificación de GraphQL permite algo llamado suscripciones que son como las consultas de GraphQL pero en lugar de devolver los datos en una lectura, obtiene los datos insertados desde el servidor.

Esto es útil para la aplicación para suscribirse a «eventos» o «resultados en vivo» desde el backend, mientras le permite controlar la «forma» del evento desde la aplicación.

Las suscripciones de GraphQL son un componente fundamental para agregar características reactivas o en tiempo real a las aplicaciones fácilmente. ¡Los servidores y clientes de GraphQL que admiten las suscripciones le permiten crear grandes experiencias sin tener que hacer frente al código de websocket!

## Haga su primera suscripción de GraphQL {#make-first-graphql-subscription}

`Step 1:` diríjase a https://hasura.io/learn/graphql/graphiql

`Step 2:` escriba esta consulta de GraphQL en el área de texto:

```graphql
subscription {
  online_users {
    id
    last_seen
    user {
      name
    }
  }
}
```

Paso 3: haga clic en el botón play.

Cada vez que cambie el conjunto de usuarios en línea, verá el último conjunto en la ventana de respuesta a la derecha.

## ¿Cómo funcionan las suscripciones de GraphQL? {#how-do-graphql-subscriptions-work}

Las mutaciones y consultas de GraphQL son cadenas enviadas a un punto de conexión de POST. ¿Qué es una suscripción de GraphQL? Eso no puede suceder sobre un punto de conexión de POST, porque un punto de conexión HTTP simple solo devolverá la respuesta y la conexión se cerrará.

Una suscripción de GraphQL es una cadena de consulta de suscripción que se envía a un punto de conexión de websocket. Y cada vez que los datos cambian en el backend, nuevos datos se insertan sobre los websockets desde el servidor al cliente.

## Resumen {#summary}

- Ahora sabe cómo hacer suscripciones de GraphQL

Ahora que se siente cómodo con los conceptos básicos de utilizar GraphQL, veamos cómo están estructurados los servidores y los clientes.

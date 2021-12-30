---
title: Observación de datos - Suscripciones
metaTitle: "Suscripciones de GraphQL para datos en tiempo real | Tutorial de hooks de Apollo con React en GraphQL"
metaDescription: "Pruebe la suscripción de GraphQL utilizando GraphiQL. Un ejemplo de suscripción de GraphQL para obtener datos en vivo insertados por websockets"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-subscriptions/"
---

La especificación GraphQL permite algo llamado suscripciones, que son como consultas de GraphQL
 pero en lugar de devolver datos en una lectura, lo que obtenemos son datos directamente del servidor.

Esto contribuye a que su app se suscriba a «eventos» o «resultados en vivo» del backend, pero
 permitiéndole controlar la «forma» del evento desde su aplicación.

Las suscripciones de GraphQL son un componente fundamental a la hora de agregar características reactivas o en tiempo real
 a sus aplicaciones fácilmente. Los clientes y servidores GraphQL que admiten suscripciones son geniales porque
 nos permiten diseñar experiencias geniales sin tener que lidiar con código websocket.

## Haga su primera suscripción de GraphQL

Paso 1: vaya a https://hasura.io/learn/graphql/graphiql
 Paso 2: escriba esta consulta de GraphQL en el área de texto:

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

Cada vez que cambia el conjunto de usuarios en línea, veremos el conjunto más reciente en
 la ventana de respuesta, a la derecha.

## ¿Cómo funcionan las suscripciones de GraphQL?

Las mutaciones y consultas de GraphQL son cadenas enviadas a un punto de conexión de POST. ¿Qué es una suscripción de GraphQL? Eso no puede suceder sobre un punto de conexión de POST, porque un punto de conexión HTTP simple solo devolverá la respuesta y la conexión se cerrará.

Una suscripción de GraphQL es una cadena de consulta de suscripción que se envía a un punto de conexión de websocket. Y cada vez que los datos cambian en el backend, nuevos datos se insertan sobre los websockets desde el servidor al cliente.

## Resumen

- Ahora sabe cómo hacer suscripciones de GraphQL

Ahora que ya dominamos los conceptos básicos de uso de GraphQL, vamos a comenzar
 a integrar API de GraphQL con una aplicación.

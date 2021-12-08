---
title: Suscripciones - Actualizaciones en tiempo real
metaTitle: "Suscripciones de GraphQL para datos en tiempo real | Tutorial de GraphQL"
metaDescription: "Pruebe la suscripción de GraphQL con GraphiQL. Un ejemplo de suscripciones GraphQL para obtener datos en vivo empujados sobre las websockets"
---

La especificación GraphQL permite que se trate de suscripciones llamadas como consultas GraphQL pero en lugar de devolver datos en una lectura, obtienes datos enviados desde el servidor.

Esto es útil para que tu aplicación se suscriba a "eventos" o "resultados en vivo" desde el backend, mientras te permite controlar la "forma" del evento desde tu app.

Las suscripciones GraphQL son un componente crítico para agregar funciones reactivas o en tiempo real a tus aplicaciones fácilmente. Los clientes y servidores GraphQL que admiten suscripciones le permiten crear grandes experiencias sin tener que lidiar con el código de websocket!

## Haz tu primera suscripción a GraphQL

`Step 1:`Dirígete a https://hasura.io/learn/graphql/graphiql

`Step 2:`Escribe esta consulta de GraphQL en el área de texto:

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

Paso 3: Haga clic en el botón de reproducción.

Cada vez que cambie el conjunto de usuarios en línea, verá el último conjunto en en la ventana de respuesta a la derecha.

## ¿Cómo funcionan las suscripciones de GraphQL?

Las consultas y mutaciones de GraphQL son cadenas enviadas a un punto final POST. ¿Qué es una suscripción GraphQL? Eso no puede suceder sobre un punto final POST, porque un simple punto final HTTP solo devolvería la respuesta y la conexión se cerraría.

Una suscripción de GraphQL es una cadena de consulta de suscripción enviada a un punto final de websocket. Y cada vez que los datos cambian en el backend, los nuevos datos se envían a través de las tomas de web del servidor al cliente.

## Resumen

- ¿Sabes cómo hacer suscripciones a GraphQL

Ahora que te sientes cómodo con los conceptos básicos de usar GraphQL, veamos cómo se estructuran los servidores y los clientes.

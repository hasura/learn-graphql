---
title: "Observabilidad"
metaTitle: "Observ de observabilidad de la | de Hasura"
metaDescription: "Observabilidad significa que puede responder cualquier pregunta sobre lo que está sucediendo en el interior del sistema simplemente observando métricas desde fuera del sistema"
---

Observabilidad significa que puede responder cualquier pregunta sobre lo que está sucediendo en el interior del sistema simplemente observando métricas desde fuera del sistema.

En una aplicación GraphQL, estas son las métricas y el contexto importantes para capturar:

- tiempo de ejecución de la consulta y la consulta
- carga útil de la consulta / hash de la consulta
- código de estado de respuesta de consultas/mutaciones/suscripciones
- Versión del servidor de graphql
- ip_address desde el que se originó la consulta

y específicamente en el caso de Hasura GraphQL Engine, es posible que desee capturar contexto como

- user_id del usuario que realizó la consulta
- El papel del usuario
- metadatos de la consulta

Con esta información disponible, puede hacer preguntas significativas en una implementación de producción para encontrar lo que salió mal internamente, o por qué su API de Hasura GraphQL se comporta de la manera que está. Por ejemplo, si ve anomalías en el tiempo de ejecución de una consulta en particular, puede intentar identificar qué está mal con la consulta (puede haber un cuello de botella de la base de datos que necesita optimizar).

## Monitoreo

Hasura Cloud viene con métricas integradas para monitorear errores, conexiones de websocket, suscripciones, con un control hacia abajo en operaciones individuales.

Así es como se ve la pestaña de errores en la nube:

![Errores](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/error-monitoring.png)

Mirando más de cerca, puede identificar qué solicitudes están fallando y por qué. Con GraphQL no tienes códigos de estado para identificar errores de forma única. Por lo tanto, las solicitudes deben ser insepcted para el `errors`objeto en respuesta.

## Trazado distribuido

El rastreo en Hasura Cloud funciona en base de datos, esquemas remotos, disparador de eventos y webhooks de auth y acciones.

Aquí hay un ejemplo de una solicitud que se está rastreando. Esto es específicamente golpear solo la base de datos.

![Inspeccionar la solicitud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/inspect-request.png)

La consulta en caché está siendo inspeccionada aquí. Inspeccionar una solicitud individual da métricas más detalladas como los encabezados, el seguimiento de la solicitud e identificadores únicos para depurar más adelante.

De igual manera cualquier solicitud hecha al esquema remoto, acciones y eventos puede ser rastreada.

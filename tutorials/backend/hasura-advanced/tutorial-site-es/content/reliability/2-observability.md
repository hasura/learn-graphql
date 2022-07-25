---
title: "Observabilidad"
metaTitle: "Observabilidad | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Observabilidad significa que puede responderse a cualquier pregunta sobre lo que esté ocurriendo en el interior del sistema a partir de la mera observación de las métricas desde el exterior del sistema"
---

Observabilidad significa que puede responderse a cualquier pregunta sobre lo que esté ocurriendo en el interior del sistema a partir de la mera observación de las métricas desde el exterior del sistema.

En una aplicación GraphQL, estas son las métricas importantes y el contexto a capturar:

- tiempo de consulta y tiempo de ejecución de las consultas
- carga útil real de la consulta/hash de la consulta
- códigos de estado de la respuesta a las consultas/mutaciones/suscripciones
- versión del servidor graphql
- ip_address desde la que se ha originado la consulta

y en el caso específico del motor Hasura GraphQL, tal vez quiera capturar contextos como

- user_id del usuario que realizó la consulta
- rol del usuario
- metadatos de la consulta

Una vez disponible esta información, puede hacer preguntas relevantes en las implementaciones de producción para descubrir lo que salió mal internamente, o por qué la API de Hasura GraphQL se comporta de una cierta manera. Por ejemplo, si observa anomalías en el tiempo de ejecución de las consultas en una consulta concreta, puede intentar identificar lo que sea que esté fallando en la consulta (podría haber un cuello de botella en la base de datos que necesita optimizarse).

## Supervisión {#monitoring}

Hasura Cloud viene con métricas integradas para la supervisión de errores, conexiones de websocket y suscripciones, con un desglose de las operaciones individuales.

Este es el aspecto de la pestaña de errores en Cloud:

![Errores](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/error-monitoring.png)

Si se observa con más detenimiento, podrá identificar qué solicitudes fallan y por qué. Con GraphQL no dispone de códigos de estado con los que identificar errores de forma individual. Así que, como respuesta, las solicitudes han de ser inspeccionadas para el objeto `errors`.

## Seguimiento distribuido {#distributed-tracing}

El seguimiento en Hasura Cloud funciona en toda la base de datos, los esquemas remotos, el desencadenador de eventos, los webhooks de autenticación y las acciones.

Aquí tiene un ejemplo del seguimiento de una solicitud. Solo afecta específicamente a la base de datos.

![Solicitud de inspección](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/inspect-request.png)

Aquí se inspecciona la consulta en la caché. Inspeccionar una solicitud individual ofrece métricas más detalladas, como los encabezados, el seguimiento de la solicitud y los identificadores únicos para la depuración posterior.

Del mismo modo, puede hacerse un seguimiento de cualquier solicitud realizada al esquema remoto, las acciones o los eventos.

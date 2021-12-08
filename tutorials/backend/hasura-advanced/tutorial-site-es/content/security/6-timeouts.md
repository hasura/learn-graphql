---
title: "Horarios"
metaTitle: "Time Tutorial avanzado de Hasura"
metaDescription: "El otro vector de ataque es hacer una consulta que lleva mucho tiempo ejecutar. Hay dos tipos de tiempo de espera en general: Timeout de base de datos y tiempo de espera HTTP"
---

El otro vector de ataque es hacer una consulta que lleva mucho tiempo ejecutar. Hay dos tipos de tiempo de espera:

Tiempo de espera de la *base de datos*: En caso de que una conexión de base de datos o una consulta tarde mucho en responder, Hasura puede devolver un error de espera de tiempo. Hay una configuración de statement_timeout en Postgres para abortar cualquier ejecución de una declaración si toma más tiempo de lo especificado. Esto es solo una configuración en la capa de base de datos (Postgres en este caso).

*Tiempo de espera HTTP*: Si está utilizando Actions/Remote Schemas/Events, habría configurado los puntos finales http para las solicitudes respectivas. Puede configurar una configuración de tiempo de espera también para abortar la ejecución de la consulta. Los endpoints Http hacen diferentes consultas en su lógica subyacente y se recomienda configurar un tiempo de espera para abortar conexiones y responder rápidamente al cliente.

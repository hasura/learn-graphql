---
title: "Alta disponibilidad"
metaTitle: "Alta disponibilidad | Tutorial avanzado de Hasura GraphQL"
metaDescription: "La API de GraphQL ofrecida por Hasura debería estar siempre operativa y ha de eliminarse cualquier punto único de fallo para lograr una infraestructura de aplicaciones fiable."
---

La API de GraphQL ofrecida por Hasura debería estar siempre operativa y ha de eliminarse cualquier punto único de fallo para lograr una infraestructura de aplicaciones fiable. Fundamentalmente, todo depende de dos aspectos de la API de GraphQL; la disponibilidad de la base de datos Postgres y la disponibilidad de Hasura.

## Alta Disponibilidad de PostgreSQL {#postgresql-ha}

Postgres ofrece [varias soluciones](https://www.postgresql.org/docs/9.3/different-replication-solutions.html) para configurar cualquier sistema altamente disponible. La mayoría de los proveedores administrados de Postgres cuentan con un sistema de alta disponibilidad para Postgres que, cuando se configura, conmutará automáticamente a Postgres en espera ante cualquier error. Así es como podemos, con Heroku, [configurar una réplica](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers) para asegurarnos de que haya un servidor en espera activa para garantizar la conmutación por error automatizada.

Aquí no hace falta ninguna configuración a nivel del proyecto Hasura.

## Alta disponibilidad de Hasura {#hasura-ha}

Pueden ejecutarse varias instancias de Hasura con el graphql-engine de código abierto. Hasura Cloud se ocupa del proceso de escalado automático y la infraestructura necesaria para su ejecución sin necesidad de intervención manual.

Además, al conectar múltiples instancias de Hasura a la misma base de datos, se resuelven las típicas preocupaciones relacionadas con que los desencadenadores de eventos dupliquen estos o que las suscripciones sean o no fiables.

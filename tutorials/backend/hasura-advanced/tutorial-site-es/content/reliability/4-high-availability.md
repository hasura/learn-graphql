---
title: "Alta Disponibilidad"
metaTitle: "High  de alta disponibilidad de tutoría avanzada de Hasura GraphQL"
metaDescription: "La API GraphQL que ofrece Hasura debe ser operativa continuamente y cualquier punto de fallo debe eliminarse para una infraestructura de aplicaciones confiable."
---

La API GraphQL que ofrece Hasura debe ser operativa continuamente y cualquier punto de fallo debe eliminarse para una infraestructura de aplicaciones confiable. Fundamentalmente hay dos aspectos que se consumen la API GraphQL; disponibilidad de la base de datos Postgres y disponibilidad de Hasura.

## PostgreSQL HA

Postgres ofrece [diversas soluciones](https://www.postgresql.org/docs/9.3/different-replication-solutions.html) para configurar un sistema altamente disponible. La mayoría de los proveedores de Postgres gestionados tienen un sistema de HA para Postgres, que cuando se configura, automáticamente se fallará en espera Postgres. Con Heroku, así es como podemos [configurar una replicación](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases#high-availability-with-followers) para garantizar que haya un servidor de espera caliente para garantizar una conmutación por error automatizada.

Aquí no se requiere ninguna configuración en el nivel del proyecto Hasura.

## Hasura HA

Se pueden ejecutar varias instancias de Hasura con el motor de código abierto graphql. En Hasura Cloud, el proceso de escalamiento automático y la infraestructura necesaria para su funcionamiento se cuida sin necesidad de intervención manual.

También con múltiples instancias de Hasura conectadas a la misma base de datos, se cuidan las preocupaciones típicas de los eventos que se desencadenan duplicando eventos o suscripciones que son fiables.

---
title: "Escalado horizontal"
metaTitle: "Escalado horizontal | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Hasura Cloud le permite escalar sus aplicaciones automáticamente sin tener que pensar en el número de instancias, núcleos, memoria, umbrales, etc."
---

Hasura Cloud le permite escalar sus aplicaciones automáticamente sin tener que pensar en el número de instancias, núcleos, memoria, umbrales, etc. Puede seguir aumentando su número de usuarios simultáneos y el número de llamadas a la API, y Hasura Cloud descubrirá las optimizaciones de forma automágica. Pero podría tener un cuello de botella a nivel de la base de datos, que sería cuando podría desear escalar la base de datos.

## Escalado horizontal de Postgres {#horizontal-scaling-of-postgres}

Hasura Cloud puede equilibrar la carga de consultas y suscripciones en las réplicas de lectura mientras envía todas las mutaciones y las llamadas a la API de metadatos al maestro. Para realizar un escalado horizontal,

- Cree réplicas de lectura de sus instancias postgres
- Configure el enrutamiento, la agrupación de conexiones y el equilibrio de la carga

En nuestro ejemplo, utilizamos Heroku para desplegar Postgres mientras creamos el proyecto Hasura Cloud. Podemos agregar una base de datos de seguidores (de solo lectura) a Heroku PostgreSQL a través de los siguientes pasos en [docs](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases)

Las réplicas de lectura pueden agregarse fácilmente a los proveedores de bases de datos gestionados.

- [Réplica de lectura Postgres de Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html)
- [Réplica de lectura SQL de Google Cloud](https://cloud.google.com/sql/docs/postgres/replication/create-replica)
- [Réplica de lectura Postgres de Azure](https://docs.microsoft.com/en-us/azure/postgresql/howto-read-replicas-portal)
- [Réplica de lectura Postgres de DigitalOcean](https://www.digitalocean.com/docs/databases/postgresql/how-to/add-read-only-nodes/)

### Añadir URL de réplica de lectura {#adding-read-replica-urls}

Una vez configuradas las réplicas de lectura para su instancia de Postgres, el equilibrio de carga en la capa de la base de datos se realiza de forma automática. En la capa de la API de Hasura, el equilibrio de carga se realiza de forma ininterrumpida con múltiples instancias de su aplicación Hasura, ejecutadas en diferentes regiones de todo el mundo.

Tras configurar Postgres con la réplica de lectura, las URL de réplica pueden agregarse a Hasura utilizando la siguiente variable de entorno en la pestaña ENV Vars de su proyecto:

```bash
HASURA_GRAPHQL_READ_REPLICA_URLS=postgres://user:password@replica-host:5432/db
```

En el caso de Heroku, esta URL puede obtenerse ejecutando el siguiente comando en el terminal:

```bash
heroku pg:info
```

Esto daría como resultado información de `DATABASE_URL, HEROKU_POSTGRESQL_PURPLE_URL`. La segunda, con el formato de `HEROKU_POSTGRESQL_COLOR_URL`, daría la información de las réplicas de lectura.

Asegúrese de reemplazar adecuadamente las credenciales de la base de datos.

Hasura Cloud se encarga del enrutamiento automático de todas las consultas, suscripciones y mutaciones maestras y de las réplicas de lectura.

Pueden ejecutarse instancias múltiples de Hasura en la misma base de datos. Tenga en cuenta que esto se realiza en Hasura Cloud de forma automática.

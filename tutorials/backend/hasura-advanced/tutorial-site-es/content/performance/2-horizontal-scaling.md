---
title: "Escala horizontal"
metaTitle: "Scal de escalamiento horizontal de la Tut de Hasura"
metaDescription: "Hasura Cloud le permite escalar sus aplicaciones automáticamente sin tener que pensar en el número de instancias, núcleos, memoria, umbrales, etc."
---

Hasura Cloud le permite escalar sus aplicaciones automáticamente sin tener que pensar en el número de instancias, núcleos, memoria, umbrales, etc. Puede seguir aumentando su número de usuarios simultáneos y el número de llamadas API y Hasura Cloud descubrirá las optimizaciones automáticamente. Pero podría tener un cuello de botella en el nivel de la base de datos, que es cuando puede que desee escalar la base de datos.

## Escalamiento horizontal de los postgres

Hasura Cloud puede cargar consultas de balance y suscripciones a través de réplicas de lectura mientras envía todas las mutaciones y llamadas a la API de metadatos al maestro. Para realizar escalado horizontal,

- Crear réplicas de lectura de sus instancias postgres
- Configurar el enrutamiento, el agrupamiento de conexiones y el equilibrio de carga

En nuestro ejemplo, usamos Heroku para implementar Postgres mientras creamos el proyecto Hasura Cloud. Podemos agregar una base de datos de seguidores (solo lectura) a Heroku PostgreSQL a través de los siguientes pasos en [docs](https://devcenter.heroku.com/articles/heroku-postgres-follower-databases)

Se pueden agregar réplicas de lectura a proveedores de bases de datos administrados fácilmente.

- [Amazon RDS Postgres Leer réplica](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html)
- [Google Cloud SQL Leer réplica](https://cloud.google.com/sql/docs/postgres/replication/create-replica)
- [Azure Postgres Leer Replica](https://docs.microsoft.com/en-us/azure/postgresql/howto-read-replicas-portal)
- [DigitalOcean Postgres Leer Replica](https://www.digitalocean.com/docs/databases/postgresql/how-to/add-read-only-nodes/)

### Añadir réplica de lectura urls

Una vez que configure las réplicas de lectura para su instancia de Postgres, el equilibrio de carga en la capa de base de datos se toma automáticamente cuidado. En la capa de Hasura API, el equilibrio de carga se realiza sin problemas con múltiples instancias de su aplicación Hasura que se ejecuta en diferentes regiones del mundo.

Después de configurar Postgres con la réplica de lectura, las URL de la réplica se pueden agregar a Hasura utilizando la siguiente variable de entorno en la pestaña ENV Vars:

```bash
HASURA_GRAPHQL_READ_REPLICA_URLS=postgres://user:password@replica-host:5432/db
```

Para Heroku, esta URL se puede obtener ejecutando el siguiente comando en el terminal:

```bash
heroku pg:info
```

Esto se mostraría `DATABASE_URL, HEROKU_POSTGRESQL_PURPLE_URL`información. El segundo con el formato de `HEROKU_POSTGRESQL_COLOR_URL`da la réplica de lectura de información.

Asegúrese de reemplazar las credenciales de la base de datos apropiadamente.

Hasura Cloud se encarga de la enrutamiento automático para consultas, suscripciones y mutaciones en las réplicas maestras y lecturas.

Se pueden ejecutar varias instancias de Hasura contra la misma base de datos. Tenga en cuenta que esto se toma en forma automática en Hasura Cloud.

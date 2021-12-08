---
title: "Transformaciones de datos"
metaTitle: "Transformaciones de datos en Postgres | Tutorial de Hasura"
metaDescription: "Vamos a aprovechar las transformaciones de datos de Postgres mediante Vistas y funciones SQL para encontrar usuarios en línea necesarios para la aplicación"
---



Una de las características en tiempo real de la aplicación todo es mostrar la lista de usuarios en línea. Necesitamos una manera de obtener esta información basada en el valor del `last_seen`cual indica cuándo el usuario fue por última vez en línea.

Hasta ahora estábamos construyendo mesas y relaciones. [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) le permite realizar transformaciones de datos utilizando:

- [Vistas](https://hasura.io/learn/database/postgresql/views/)
- Funciones SQL

En este ejemplo, vamos a hacer uso de `Views`. Esta vista es obligada por la aplicación para encontrar a los usuarios que han iniciado sesión y están en línea en los últimos 30 segundos.

## Crear una vista

La instrucción SQL para crear esta vista se ve así:

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

Vamos a añadir esta vista y rastrear la vista con Hasura para poder consultarla.

Vaya a la Consola -> DATA -> página SQL.

![Crear vista online_users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-view.png)

Haga clic en `Run`para crear la vista.

## Suscripción a usuarios en línea

Ahora vamos a probar haciendo una consulta de suscripción a la `online_users`vista.

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

En otra pestaña, actualice el `last_seen`valor de un usuario existente para ver la respuesta de suscripción al actualizarse.

![Actualizar usuarios last_seen](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/update-users-last-seen.png)

Introduzca el valor en cuanto `now()`a la `last_seen`columna y haga clic en .`Save`

Ahora cambie a la pestaña donde se está ejecutando la consulta de suscripción para ver la respuesta actualizada.

![Suscripción usuarios en línea](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-subscription.png)

---
title: "Transformaciones de datos"
metaTitle: "Transformaciones de datos en Postgres | Tutorial de GraphQL de Hasura"
metaDescription: "Vamos a aprovechar las transformaciones de datos de Postgres utilizando las vistas y las funciones de SQL para encontrar los usuarios en línea que se necesitan para la aplicación"
---



Una de las características en tiempo real de la aplicación de tareas pendientes es mostrar la lista de usuarios en línea. Necesitamos una manera de buscar esta información según el valor de `last_seen` que dice cuándo el usuario estuvo por última vez en línea.

Hasta ahora estábamos construyendo tablas y relaciones.
 [Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) le permite realizar transformaciones de datos mediante el uso de:

- [Vistas](https://hasura.io/learn/database/postgresql/views/)
- Funciones SQL

En este ejemplo, vamos a hacer uso de `Views`. La aplicación requiere esta vista para encontrar a los usuarios que han iniciado sesión y están en línea en los últimos 30 segundos.

## Crear una vista {#create-view}

La instrucción de SQL para crear esta vista es como esto:

```sql
CREATE OR REPLACE VIEW "public"."online_users" AS
 SELECT users.id,
    users.last_seen
   FROM users
  WHERE (users.last_seen >= (now() - '00:00:30'::interval));
```

Agregamos esta vista y rastreamos la vista con Hasura para poder consultarla.

Diríjase a Console -> DATA -> página de SQL.

![Crear una vista online_users](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-view.png)

Haga clic en `Run` para crear la vista.

## Suscripción a los usuarios en línea {#subscription-to-online-users}

Ahora vamos a probar mediante una consulta de suscripción a la vista `online_users`.

```graphql
subscription {
  online_users {
    id
    last_seen
  }
}
```

En otra pestaña, actualice el valor `last_seen` de un usuario existente para ver la respuesta de suscripción que se está actualizando.

![Actualizar last_seen de los usuarios](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/update-users-last-seen.png)

Ingrese el valor como `now()` para la columna `last_seen` y haga clic en `Save`.

Ahora cambie a la pestaña en la que se está ejecutando la consulta de suscripción para ver la respuesta actualizada.

![Suscripción de los usuarios en línea](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/online-users-subscription.png)

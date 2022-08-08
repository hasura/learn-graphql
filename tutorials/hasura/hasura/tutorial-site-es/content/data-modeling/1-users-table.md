---
title: "Crear la tabla de usuarios"
metaTitle: "Crear la tabla de usuarios | Tutorial de GraphQL"
metaDescription: "Creemos la tabla de usuarios con la consola de Hasura yendo a la pestaña Data y haciendo clic en la tabla Create"
---

Empecemos por crear la tabla `users`.

La tabla `users` tendrá las siguientes columnas:

- `id` (tipo texto),
- `name` (tipo texto),
- `created_at` (tipo marca de tiempo y now() como valor predeterminado)
- `last_seen` (tipo marca de tiempo y acepta valores nulos)

Las columnas están asociadas con las propiedades de los usuarios. La columna `last_seen` se utiliza para almacenar la última marca de tiempo de cuando el usuario estuvo en línea.

En la consola de Hasura, diríjase a la sección de pestaña de `DATA` y haga clic en la base de datos de Heroku (desde la navegación lateral izquierda) a la que nos conectamos antes. El nombre de la base de datos sería `default` y el nombre de esquema sería `public`. Una vez que aterriza en el esquema `public`, haga clic en `Create Table`. Ingrese los valores para crear la tabla como se mencionó anteriormente.

![Cree usuarios de la tabla](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

Una vez que haya terminado, haga clic en el botón `Add Table` para crear la tabla.

¡Genial! Ha creado la primera tabla necesaria para la aplicación.

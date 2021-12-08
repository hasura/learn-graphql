---
title: "Crear tabla de usuarios"
metaTitle: "Crear una tabla de usuarios | Tutorial de Hasura"
metaDescription: "Vamos a crear la tabla de usuarios con la consola Hasura dirigiendo a la pestaña Datos y haciendo clic en Crear tabla"
---

Empecemos creando la `users`mesa.

La `users`tabla tendrá las siguientes columnas:

- `id`(tipo Texto),
- `name`(tipo Texto),
- `created_at`(teclear Marca de tiempo y por defecto ahora())
- `last_seen`(tipo Timestamp y nullable)

Las columnas están asociadas con las propiedades de los usuarios. La `last_seen`columna se utiliza para almacenar la última marca de tiempo de cuando el usuario estaba en línea.

En la Consola de Hasura, dirígete a la sección de `DATA`pestañas y haz clic en la base de datos de Heroku (desde la navegación lateral izquierda) que conectamos anteriormente. El nombre de la base de datos sería `default`y el nombre del esquema sería.`public` Una vez que aterrizas en el `public`esquema, haz clic en .`Create Table` Introduzca los valores para crear la tabla como se mencionó anteriormente.

![Crear usuarios de tabla](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-users.png)

Una vez que haya terminado, haga clic en el `Add Table`botón para crear la tabla.

¡Genial! Ha creado la primera tabla necesaria para la aplicación.

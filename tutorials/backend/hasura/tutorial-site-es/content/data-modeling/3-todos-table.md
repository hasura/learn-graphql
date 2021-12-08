---
title: "Crear tabla todos"
metaTitle: "Crear todos la tabla | Tutorial de Hasura"
metaDescription: "Vamos a crear la tabla todos con la consola Hasura dirigiendo a la pestaña Datos y haciendo clic en Crear tabla"
---

Ahora vamos a seguir creando el otro modelo:`todos`

La `todos`tabla tendrá las siguientes columnas:

- `id`(tipo Integer (auto-incremento)),
- `title`(tipo Texto),
- `is_completed`(tipo Boolean y false)
- `is_public`(tipo Boolean y false)
- `created_at`(teclear Marca de tiempo y por defecto ahora())
- `user_id`(Texto tipo)

Las columnas están asociadas con propiedades de los elementos de todo.

Recuerde establecer la columna id en la clave primaria.

En la Consola de Hasura, dirígete a la sección de `DATA`pestañas y haz clic en .`Create Table` Introduzca los valores para crear la tabla como se mencionó anteriormente.

![Crear usuarios de tabla](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-table-todos.png)

Una vez que haya terminado, haga clic en el `Add Table`botón para crear la tabla.

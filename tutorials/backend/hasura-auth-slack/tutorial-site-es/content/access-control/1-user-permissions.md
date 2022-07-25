---
title: "Permisos para usuarios"
metaTitle: "Permisos para usuarios | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte, aprenderemos a crear permisos para los usuarios de la aplicación"
---

La aplicación de Slack gira en torno a los usuarios. Comenzamos configurando reglas de permisos para los usuarios de la aplicación para las operaciones de CRUD.

## Seleccione el permiso {#select-permission}

¿Qué datos de usuario puede leer un usuario registrado de Slack?

Todos los usuarios registrados pueden leer los datos de usuario de aquellos que pertenecen al mismo espacio de trabajo que el usuario registrado.

El requisito se traduce en algo parecido a:

- Puede leer sus propios datos de usuario.
- Puede leer los datos de usuario de otros que forman parte del mismo espacio de trabajo del que es miembro.

Esta es una expresión booleana típica en la que dice que el que está tratando de acceder a un registro en la tabla de usuarios debe pertenecer a ellos `id = X-Hasura-User-Id` o debe ser parte del mismo espacio de trabajo `workspace_members.user_id = X-Hasura-User-Id`

### Selección del nivel de fila {#row-level-select}

La expresión booleana válida de la declaración anterior es similar a:

```
{
  "_or": [
    {
      "id": {
        "_eq": "X-Hasura-User-Id"
      }
    },
    {
      "workspace_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  ]
}
```

### Selección del nivel de columna {#column-level-select}

Después de filtrar las filas a las que un usuario debería acceder, necesitamos filtrar qué campos se les permite leer. Aparte del campo `password`, todos los usuarios autenticados pueden acceder a todas las columnas de la tabla `users`, ya que no hay datos sensibles que se necesiten restringir solo para el usuario.

![Permisos de columna de usuario](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-users-select-columns.png)

Terminamos con el acceso de lectura. Pasemos al acceso de escritura que permite a un usuario crear, actualizar o eliminar.

## Insertar el permiso {#insert-permission}

¿Los usuarios de la aplicación pueden inscribirse directamente en la tabla `users`? No. Un usuario se registra en la aplicación, que pasa por el servidor de autenticación que se ocupa de registrar al usuario, validarlo, desencadenar el correo de bienvenida y demás. Por lo tanto, el servidor de autenticación con acceso al rol de administrador insertará el registro en la validación de la publicación de la tabla `users` y generará el token correcto. Podemos omitir definir los permisos para la operación de inserción del rol del usuario.

## Permiso de actualización {#update-permission}

¿Quién puede actualizar los datos existentes en la tabla `users`?

Como usuario autenticado de la aplicación, debería poder actualizar SOLO mis propios datos personales.

### Actualización del nivel de fila {#row-level-update}

La condición anterior se traduce en la siguiente expresión:

```json
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Actualice la fila solo si `id` de la columna coincide con el valor de ID del usuario autenticado (`X-Hasura-User-Id`)

### Actualización del nivel de columna {#column-level-update}

Necesitamos establecer en qué columnas se le permite al usuario actualizar directamente desde la aplicación. Una simple lista de verificación sería no permitir que el usuario actualice su propia `id`, `email` y `created_at`. También vamos a restringirlos para modificar directamente la columna `password` ya que eso se delega al servidor de autenticación que hace la validación necesaria antes de la actualización.

## Permiso de eliminación {#delete-permission}

No queremos permitir que el usuario elimine su propio registro de usuario directamente desde la aplicación y, por lo tanto, podemos omitir las reglas de definición para esta operación. Se supone que esto lo harán los servidores de autenticación que gestionan las validaciones de publicaciones de la gestión del usuario para eliminar las cuentas de usuario.

## Potencial para otros roles {#potential-for-other-roles}

Todas las reglas anteriores se aplicaron para el rol de usuario. Pero digamos que hay campos que son privados para el usuario y que otros usuarios no deberían poder leer. Por ejemplo, en nuestro modelo actual, se supone que el campo `phone_number` es público. En caso de que el requisito sea que sea privado para el usuario, entonces necesitamos crear un nuevo rol, llamémoslo `me` y definamos las reglas para la selección de permisos sin la columna `phone_number`.

La regla de selección del nivel de la fila se traducirá en algo parecido a esto:

```
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Y el permiso del nivel de columna sigue siendo el mismo para el rol `me`, pero el rol `user` no tendrá acceso a la columna `phone_number`.

---
title: "Permisos para usuarios"
metaTitle: "Permisos para usuarios | Tutorial de la carencia de Hasura"
metaDescription: "En esta parte, aprenderemos cómo crear permisos para los usuarios de la aplicación"
---

La aplicación Slack gira en torno a los usuarios. Comenzamos estableciendo reglas de permisos para los usuarios de la aplicación para las operaciones CRUD.

## Seleccionar permiso

¿Qué datos de usuario se permite leer por un usuario conectado de Slack?

Todos los usuarios que hayan iniciado sesión pueden leer los datos de los usuarios que pertenecen al mismo espacio de trabajo que el usuario iniciado sesión.

El requisito se traduce en algo como:

- Puede leer sus propios datos de usuario.
- Puedes leer los datos de los usuarios de otros que forman parte del mismo espacio de trabajo del que eres miembro.

`id = X-Hasura-User-Id`Esta es una expresión booleana típica en la que se dice que el que está tratando de acceder a un registro en la tabla de usuarios debe pertenecer o debe ser parte del mismo espacio de trabajo`workspace_members.user_id = X-Hasura-User-Id`

### Nivel de fila seleccionar

La expresión booleana válida ampliada de la declaración anterior se ve así:

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

### Nivel de columna seleccionar

Después de filtrar las filas a las que se supone que tiene que acceder un usuario, necesitamos filtrar los campos que se les permite leer. Aparte del `password`campo, cada columna de la `users`tabla es accesible por cualquier usuario autenticado, ya que no hay datos sensibles que deban restringirse únicamente al usuario.

![Usuarios Permisos de columna](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-users-select-columns.png)

Hemos terminado con acceso a la lectura. Pasemos a escribir acceso que permite a un usuario crear, actualizar o eliminar.

## Insertar permiso

¿Se permite a los usuarios de la aplicación insertar directamente en la `users`tabla? No. Un usuario se registra en la aplicación que pasa por el servidor auth que se ocupa de registro de usuario, validación, activación de correo electrónico de bienvenida y así sucesivamente. Por lo tanto, el servidor de auth con acceso al rol de administrador insertará el registro en la validación de la publicación de la `users`tabla y generará el token correcto. Podemos omitir los permisos de definición para la operación de inserción del rol de usuario.

## Licencia de actualización

¿A quién se le permite actualizar los datos existentes en la `users`tabla?

Como usuario autenticado de la aplicación, debería poder actualizar SOLO mis propios datos personales.

### Actualización de nivel de fila

La condición anterior se traduce en la siguiente expresión:

```json
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Actualice la fila solo si el valor de la columna `id`coincide con el id del usuario autenticado ()`X-Hasura-User-Id`

### Actualización del nivel de columna

`id``email`Necesitamos arreglar qué columnas se le permite al usuario actualizar directamente desde la aplicación. Una simple lista de verificación sería no permitir al usuario actualizar sus propias , y `created_at`. También vamos a restringirlas a modificar directamente la `password`columna ya que se delega en el servidor de autenticación que hace la validación necesaria antes de la actualización.

## Eliminar permiso

No queremos permitir que el usuario borre su propio registro de usuario directamente de la aplicación y por lo tanto podemos omitir las reglas definitorias para esta operación. Se supone que esto se realiza por los servidores Auth que gestiona las validaciones de los mensajes de usuario para eliminar las cuentas de usuario.

## Potencial para otros roles

Todas las reglas anteriores se aplicaron para el rol de usuario. Pero digamos que hay campos que son privados para el usuario y que no deben ser leídos por otros usuarios. Por ejemplo, en nuestro modelo actual, se supone que el `phone_number`campo es público. En caso de que el requisito sea privado para el usuario, entonces necesitamos crear un nuevo rol, llamémoslo `me`y definamos reglas para el permiso de selección sin la `phone_number`columna.

La regla de selección de nivel de fila se traducirá en algo como esto:

```
{
  "id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

`user`Y el permiso de nivel de columna sigue siendo el mismo para el rol, `me`pero el rol no tendrá acceso a la `phone_number`columna.

---
title: "Permisos para subprocesos y mensajes"
metaTitle: "Permisos para subprocesos y mensajes | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte, aprenderemos a crear permisos para subprocesos y mensajes de la aplicación"
---

Ya terminamos con las reglas para todas las tablas base (`users`, `workspace` y `channel`). La parte principal de Slack es que los usuarios envíen y reciban mensajes en el canal o a otros usuarios. Veamos cómo se aplica eso en las reglas de control de acceso.

Empecemos con las tablas `channel_thread` y `channel_thread_message`.

## Seleccione el permiso {#select-permission}

Necesitamos hacer una lista de quién puede acceder a un mensaje publicado en cualquier canal. El requisito es como:

- Cualquiera que sea un miembro de un canal debería poder acceder a todos los hilos del canal.

### Selección del nivel de fila {#row-level-select}

La expresión para `channel_thread` se traduce aproximadamente como lo siguiente:

```json
{
  "channel": {
    "channel_members": {
      "user_id": {
        "_eq": "X-Hasura-User-Id"
      }
    }
  }
}
```
La expresión difiere un poco para `channel_thread_message` ya que tiene un nivel más de anidamiento.

```json
{
  "channel_thread": {
    "channel": {
      "channel_members": {
        "user_id": {
          "_eq": "X-Hasura-User-Id"
        }
      }
    }
  }
}
```

### Selección del nivel de columna {#column-level-select}

Después de filtrar las filas a las que un usuario debería acceder, necesitamos filtrar qué campos se les permite leer. Como no hay datos sensibles que se necesiten restringir solo a cierto tipo de usuario, damos permiso para seleccionar TODAS las columnas.

Terminamos con el acceso de lectura. Pasemos al acceso de escritura que permite a un usuario crear, actualizar o eliminar un canal.

## Insertar el permiso {#insert-permission}

Cualquier usuario autenticado que sea parte de un espacio de trabajo puede publicar mensajes en los canales del espacio de trabajo. Se traduce en la misma expresión que se muestra arriba para la tabla `channel_thread`.

## Permiso de actualización {#update-permission}

Los usuarios no pueden actualizar `channel_thread`. Entonces, ¿quién puede actualizar los mensajes existentes en la tabla `channel_thread_message`?

- Cualquier usuario autenticado puede actualizar su propio mensaje publicado en cualquier canal.

### Actualización del nivel de fila {#row-level-update}

La condición anterior se traduce en la siguiente expresión:

```json
{
  "user_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Actualización del nivel de columna {#column-level-update}

El usuario solo puede actualizar la columna `message` en la tabla `channel_thread_message`.

## Permiso de eliminación {#delete-permission}

El usuario que creó el mensaje puede eliminar su propio mensaje. Se traduce en la misma expresión que definimos para la operación de actualización.

Una vez más, como en los pasos anteriores, se puede aplicar la eliminación de CASCADA para eliminar todos los datos pendientes y dependientes.


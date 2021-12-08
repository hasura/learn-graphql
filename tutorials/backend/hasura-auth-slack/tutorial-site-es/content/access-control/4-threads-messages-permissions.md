---
title: "Permisos para Hilos y Mensajes"
metaTitle: "Permisos para hilos y mensajes | Tutorial de la carencia de Hasura"
metaDescription: "En esta parte, aprenderemos cómo crear permisos para hilos y mensajes de la aplicación"
---

Hemos terminado con reglas para todas las tablas base `users`(, `workspace`y `channel`). La parte principal de slack es que los usuarios envíen y reciban mensajes en el canal o a otros usuarios. Veamos cómo es aplicable en las reglas de control de acceso.

`channel_thread`Empecemos con las `channel_thread_message`mesas.

## Seleccionar permiso

Necesitamos enumerar quién puede acceder a un mensaje publicado en cualquier canal. El requisito se ve como:

- Cualquier cuerpo que sea miembro de canal debe poder acceder a todos los hilos de canal.

### Nivel de fila seleccionar

La expresión para la traducción `channel_thread`aproximada se traduce a lo siguiente:

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
La expresión difiere de la luz, `channel_thread_message`ya que tiene un nivel más de anidamiento.

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

### Nivel de columna seleccionar

Después de filtrar las filas a las que se supone que tiene que acceder un usuario, necesitamos filtrar los campos que se les permite leer. Dado que no hay datos sensibles que deban restringirse solo a un cierto tipo de usuario, damos permiso para seleccionar todas las columnas.

Hemos terminado con acceso a la lectura. Pasemos a escribir acceso que permite a un usuario crear, actualizar o eliminar un canal.

## Insertar permiso

Cualquier usuario autenticado que sea parte de un espacio de trabajo puede publicar mensajes en los canales del espacio de trabajo. Se traduce en la misma expresión que en la tabla `channel_thread`anterior.

## Licencia de actualización

`channel_thread`No se permite a los usuarios actualizar a . Entonces, ¿a quién se le permite actualizar los mensajes existentes en la `channel_thread_message`tabla?

- Cualquier usuario autenticado puede actualizar su propio mensaje publicado en cualquier canal.

### Actualización de nivel de fila

La condición anterior se traduce en la siguiente expresión:

```json
{
  "user_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Actualización del nivel de columna

El usuario solo puede actualizar la `message`columna en la `channel_thread_message`tabla.

## Eliminar permiso

El usuario que creó el mensaje puede borrar su propio mensaje. Se traduce en la misma expresión que definimos para la operación de actualización.

De nuevo, como en los pasos anteriores, CASCADE delete puede ser aplicado para eliminar todos los datos dependientes y colgantes.


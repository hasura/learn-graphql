---
title: "Permisos para espacios de trabajo"
metaTitle: "Permisos para espacios de trabajo | Tutorial de la carencia de Hasura"
metaDescription: "En esta parte, aprenderemos a crear permisos para los espacios de trabajo de la aplicación"
---

## Seleccionar permiso

¿Qué datos del espacio de trabajo se permite leer por un usuario registrado de Slack?

- Cualquier persona que sea miembro de un espacio de trabajo debe ser capaz de leer datos sobre su espacio de trabajo.

Esta es una expresión booleana típica donde se dice que el que está tratando de acceder a un registro en la tabla de espacio de trabajo debe ser el propietario `owner_id = X-Hasura-User-Id`o debe ser parte del mismo espacio de trabajo`workspace_members.user_id = X-Hasura-User-Id`

### Nivel de fila seleccionar

La expresión booleana válida ampliada de la declaración anterior se ve así:

```
{
  "_or": [
    {
      "owner_id": {
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

Después de filtrar las filas a las que se supone que tiene que acceder un usuario, necesitamos filtrar los campos que se les permite leer. Dado que no hay datos sensibles que deban restringirse solo a un cierto tipo de usuario, damos permiso para seleccionar todas las columnas.

Hemos terminado con acceso a la lectura. Pasemos a escribir acceso que permite a un usuario crear, actualizar o eliminar.

## Insertar permiso

¿Se permite a los usuarios de la aplicación insertar directamente en la `workspace`tabla? Sí, cualquier usuario autenticado puede crear un espacio de trabajo por su cuenta. Se traduce en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Presets de columna

Puede establecer valores estáticos o variables de sesión como valores predeterminados para la columna mientras se hace un inserto.

En la tabla de espacio de trabajo, el owner_id debe ajustarse automáticamente a la variable de sesión `X-Hasura-User-Id`y no se debe permitir al usuario establecer este valor. En este caso usamos los ajustes preestablecidos de columna para lograrlo.

![Inserto de usuario de espacio de trabajo de Slack](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-workspace-user-insert.png)

## Licencia de actualización

¿A quién se le permite actualizar los datos existentes en la `workspace`tabla?

Solo se debe permitir que un usuario autenticado de la aplicación y el propietario del espacio de trabajo actualice los datos en el espacio de trabajo.

### Actualización de nivel de fila

La condición anterior se traduce en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Actualice la fila solo si el valor de la columna `owner_id`coincide con el id del usuario autenticado ()`X-Hasura-User-Id`

### Actualización del nivel de columna

`owner_id`Necesitamos arreglar las columnas que el usuario puede actualizar directamente desde la aplicación. Una simple lista de verificación sería NO permitir que el usuario actualice la `id`, y los `created_at`valores. Se pueden permitir las columnas restantes.

## Eliminar permiso

El propietario del espacio de trabajo debe ser el único usuario que debería ser capaz de eliminar el espacio de trabajo. Esto se traduce nuevamente en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Tenga en cuenta que, en caso de que el espacio de trabajo se elimine todos los registros dependientes en todas las demás tablas también deben ser eliminados. Por lo tanto, esto puede hacerse como una sola operación por el rol de administrador en el lado del servidor en lugar de permitir la eliminación directa del espacio de trabajo del cliente. La otra opción es usar activadores ON DELETE para realizar un borrado en cascada que eliminará todas las filas dependientes a través de la base de datos.

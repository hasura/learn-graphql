---
title: "Permisos para espacios de trabajo"
metaTitle: "Permisos para espacios de trabajo | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte, aprenderemos a crear permisos para los espacios de trabajo de la aplicación"
---

## Seleccione el permiso {#select-permission}

¿Qué datos del espacio de trabajo puede leer un usuario registrado de Slack?

- Cualquier persona que sea miembro de un espacio de trabajo debe poder leer los datos sobre su espacio de trabajo.

Esta es una expresión booleana típica que dice que el que está tratando de acceder a un registro en la tabla del espacio de trabajo debe ser el propietario `owner_id = X-Hasura-User-Id` o debe ser parte del mismo espacio de trabajo `workspace_members.user_id = X-Hasura-User-Id`

### Selección del nivel de fila {#row-level-select}

La expresión booleana válida de la declaración anterior se parece a esto:

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

### Selección del nivel de columna {#column-level-select}

Después de filtrar las filas a las que un usuario debería acceder, necesitamos filtrar qué campos se les permite leer. Como no hay datos sensibles que se necesiten restringir solo a cierto tipo de usuario, damos permiso para seleccionar todas las columnas.

Terminamos con el acceso de lectura. Pasemos al acceso de escritura que permite a un usuario crear, actualizar o eliminar.

## Permiso de inserción {#insert-permission}

¿Los usuarios de la aplicación pueden inscribirse directamente en la `workspace`tabla ?

 Sí, cualquier usuario autenticado puede crear un espacio de trabajo por sí mismo. Se traduce en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

### Predeterminados de columna {#column-presets}

Puede establecer valores estáticos o variables de sesión como valores predeterminados para la columna mientras se hace una inserción.

En la tabla del espacio de trabajo, owner_id debería configurarse automáticamente a la variable de sesión `X-Hasura-User-Id` y no debería permitirse que el usuario establezca este valor. Utilizamos preestablecidos de columna en este caso para lograr esto.

![Inserción del usuario del espacio de trabajo de Slack](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-workspace-user-insert.png)

## Permiso de actualización {#update-permission}

¿Quién puede actualizar los datos existentes en la tabla `workspace`?

Solo se debería permitir que un usuario autenticado de la aplicación y el propietario del espacio de trabajo actualicen los datos en el espacio de trabajo.

### Actualización del nivel de fila {#row-level-update}

La condición anterior se traduce en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Actualice la fila solo si `owner_id` de la columna coincide con el valor de ID del usuario autenticado (`X-Hasura-User-Id`)

### Actualización del nivel de columna {#column-level-update}

Necesitamos establecer en qué columnas se le permite al usuario actualizar directamente desde la aplicación. Una simple lista de verificación sería NO permitir que el usuario actualice los valores `id`, `owner_id` y `created_at`. Se pueden permitir las columnas restantes.

## Permiso de eliminación {#delete-permission}

El propietario del espacio de trabajo debería ser el único usuario que pueda eliminar el espacio de trabajo. Esto se traduce en la siguiente expresión:

```json
{
  "owner_id": {
    "_eq": "X-Hasura-User-Id"
  }
}
```

Tenga en cuenta que, en caso de que el espacio de trabajo se elimine, todos los registros dependientes en todas las demás tablas también deben eliminarse. Por lo tanto, el rol de administrador puede hacer esto como una única operación en el lado del servidor, en lugar de permitir la eliminación directa del espacio de trabajo del cliente. La otra opción es utilizar desencadenantes AL ELIMINAR para realizar una eliminación en cascada que eliminará todas las filas dependientes en la base de datos.

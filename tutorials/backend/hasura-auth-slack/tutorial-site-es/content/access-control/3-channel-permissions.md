---
title: "Permisos para canales"
metaTitle: "Permisos para canales | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte, aprenderemos a crear permisos para los canales de la aplicación"
---

## Seleccione el permiso {#select-permission}

Necesitamos ver qué datos de canal son accesibles para los usuarios. Los criterios parecen simples:

- Cualquier persona que sea miembro de un canal debería poder leer los datos sobre ese canal.

Esta es una expresión booleana típica que dice que el que está tratando de acceder a un registro en la tabla de canal debe ser parte del canal `channel_members.user_id = X-Hasura-User-Id`

### Selección del nivel de fila {#row-level-select}

La expresión booleana válida de la declaración anterior se parece a esto:

```
{
  "channel_members": {
    "user_id": {
      "_eq": "X-Hasura-User-Id"
    }
  }
}
```

### Selección del nivel de columna {#column-level-select}

Después de filtrar las filas a las que un usuario debería poder acceder, necesitamos filtrar qué campos se les permite leer. Como no hay datos sensibles que se necesiten restringir solo a cierto tipo de usuario, damos permiso para seleccionar todas las columnas.

Terminamos con el acceso de lectura. Pasemos a escribir el acceso que permite a un usuario crear, actualizar o eliminar un canal.

## Inserte el permiso {#insert-permission}

¿Los usuarios de la aplicación pueden inscribirse directamente en la tabla `channel`? Sí, cualquier usuario autenticado que sea un propietario o un administrador tiene permitido crear un canal por su cuenta. Pero pueden crear canales solo en los espacios de trabajo de los que forman parte. Se traduce en la siguiente expresión:

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

Utilizamos la expresión booleana `_and` para decir que se deben cumplir ambas condiciones. La tabla user_type es una enumeración con valores `owner`, `admin` y `member`. Los propietarios y los administradores del espacio de trabajo pueden crear un canal y de ahí la expresión anterior.

### Predeterminados de columna {#column-presets}

En la tabla de canales, `created_by` debería configurarse automáticamente a la variable de sesión `X-Hasura-User-Id` y no debería permitirse que el usuario establezca este valor. Utilizamos preestablecidos de columna en este caso para lograr esto.

## Permiso de actualización {#update-permission}

¿Quién puede actualizar los datos existentes en la tabla `channel`?

Solo se debería permitir que un usuario autenticado de la aplicación y el propietario o administrador del espacio de trabajo actualicen los datos en el espacio de trabajo.

### Actualización del nivel de fila {#row-level-update}

La condición anterior se traduce en la siguiente expresión (igual que antes)

```json
{
  "_and": [
    {
      "workspace": {
        "workspace_members": {
          "user_id": {
            "_eq": "X-Hasura-User-Id"
          }
        }
      }
    },
    {
      "workspace": {
        "workspace_members": {
          "user_type": {
            "type": {
              "_in": [
                "owner",
                "admin"
              ]
            }
          }
        }
      }
    }
  ]
}
```

### Actualización del nivel de columna {#column-level-update}

Necesitamos establecer en qué columnas se le permite al usuario actualizar directamente desde la aplicación. Solo se puede permitir cambiar el nombre y el estado público de un canal. (`is_public` y `name`).

## Permiso de eliminación {#delete-permission}

El propietario del espacio de trabajo y los administradores deben ser los únicos usuarios que puedan eliminar el canal. Otra vez, esto se traduce en la expresión booleana anterior (igual que insertar y actualizar).

Tenga en cuenta que, en caso de que el canal se elimine, todos los registros dependientes en todas las demás tablas también deben eliminarse. Por lo tanto, el rol de administrador puede hacer esto como una única operación en el lado del servidor, en lugar de permitir la eliminación directa del canal desde el cliente. La otra opción es utilizar desencadenantes AL ELIMINAR para realizar una eliminación en cascada que eliminará todas las filas dependientes en la base de datos.

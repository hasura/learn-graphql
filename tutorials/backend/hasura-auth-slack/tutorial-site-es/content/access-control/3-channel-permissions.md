---
title: "Permisos para canales"
metaTitle: "Permisos para canales | Tutorial de la carcasa de Hasura"
metaDescription: "En esta parte, aprenderemos cómo crear permisos para los canales de la aplicación"
---

## Seleccionar permiso

Necesitamos ver qué datos de canal son accesibles para los usuarios. Los criterios parecen sencillos:

- Cualquier persona que sea miembro de un canal debe ser capaz de leer datos sobre ese canal.

Esta es una expresión booleana típica donde se dice que el que está tratando de acceder a un registro en la tabla de canal debe ser parte del canal`channel_members.user_id = X-Hasura-User-Id`

### Nivel de fila seleccionar

La expresión booleana válida ampliada de la declaración anterior se ve así:

```
{
  "channel_members": {
    "user_id": {
      "_eq": "X-Hasura-User-Id"
    }
  }
}
```

### Nivel de columna seleccionar

Después de filtrar las filas a las que se supone que tiene que acceder un usuario, necesitamos filtrar los campos que se les permite leer. Dado que no hay datos sensibles que deban restringirse solo a un cierto tipo de usuario, damos permiso para seleccionar todas las columnas.

Hemos terminado con acceso a la lectura. Pasemos a escribir acceso que permite a un usuario crear, actualizar o eliminar un canal.

## Insertar permiso

¿Se permite a los usuarios de la aplicación insertar directamente en la `channel`tabla? Sí, cualquier usuario autenticado que sea propietario o administrador puede crear un canal por su cuenta. Pero solo pueden crear canales en espacios de trabajo de los que forman parte. Se traduce en la siguiente expresión:

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

Utilizamos la expresión `_and`booleana para decir que ambas condiciones necesitan ser satisfechas `owner`La tabla user_type es un enum con valores , `admin`y .`member` Tanto los propietarios como los administradores del espacio de trabajo pueden crear un canal y de ahí la expresión anterior.

### Presets de columna

En la tabla de canales, el usuario `created_by`debe ajustarse automáticamente a la variable de sesión `X-Hasura-User-Id`y no debe permitirse que el usuario establezca este valor. En este caso usamos los ajustes preestablecidos de columna para lograrlo.

## Licencia de actualización

¿A quién se le permite actualizar los datos existentes en la `channel`tabla?

Solo se debe permitir que un usuario autenticado de la aplicación y el propietario o administrador del espacio de trabajo actualice los datos en el espacio de trabajo.

### Actualización de nivel de fila

La condición anterior se traduce a la siguiente expresión (igual que arriba)

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

### Actualización del nivel de columna

Necesitamos arreglar las columnas que el usuario puede actualizar directamente desde la aplicación. Sólo se puede permitir el estado público y el nombre de un canal cambiar. ( `is_public`y `name`).

## Eliminar permiso

El propietario del espacio de trabajo y los administradores deben ser el único usuario (s) que debería ser capaz de eliminar el canal. Esto se traduce nuevamente en la expresión booleana anterior (igual que insertar y actualizar).

Tenga en cuenta que, en caso de que el canal se borre todos los registros dependientes en todas las demás tablas también deben ser eliminados. Por lo tanto, esto puede hacerse como una sola operación por el rol de administrador en el lado del servidor en lugar de permitir la eliminación directa del canal del cliente. La otra opción es usar activadores ON DELETE para realizar un borrado en cascada que eliminará todas las filas dependientes a través de la base de datos.

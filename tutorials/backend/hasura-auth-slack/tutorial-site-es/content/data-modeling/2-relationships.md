---
title: "Relaciones"
metaTitle: "Relaciones | El Salvador de la Tierra"
metaDescription: "Objeto y arreglos de relaciones para el clon de la carcasa"
---

Las relaciones le permiten realizar consultas de objetos anidados si las tablas / vistas de su base de datos están conectadas.

Las relaciones de esquema GraphQL pueden ser cualquiera de

- relaciones de objetos (uno-a-uno)
- relaciones de matriz (uno a muchos)

## Relaciones de Objetos

`user`Digamos que desea consultar `workspace`y más información sobre quién lo creó. Esto es posible mediante consultas anidadas si existe una relación entre los dos. Esta es una consulta de uno a uno y por lo tanto llamada una relación de objeto.

Un ejemplo de una consulta anidada parece así:

```graphql
query {
  workspace {
    id
    name
    owner {
      id
      name
    }
  }
}
```

En una sola consulta, puede obtener espacio de trabajo y su información de usuario relacionada. Esto puede ser muy potente porque puedes anidar a cualquier nivel.

## Relaciones de Array

Veamos una consulta de ejemplo para las relaciones de matrices.

```graphql
query {
  users {
    id
    name
    messages {
      id
      message
      channel_id
    }
  }
}
```

En esta consulta, usted es capaz de buscar usuarios y para cada usuario, está buscando los mensajes (múltiples) enviados por ese usuario. Dado que un usuario puede tener múltiples mensajes, esto sería una relación de matriz.

Las relaciones pueden ser capturadas por restricciones de clave extranjeras. Las restricciones de clave extranjeras aseguran que no hay datos que cuelgan. Hasura Console sugiere automáticamente relaciones basadas en estas restricciones.

Aunque las restricciones son opcionales, se recomienda hacer cumplir estas restricciones para la consistencia de datos.

Las consultas anteriores no funcionarán aún porque aún no hemos definido las relaciones. Pero esto da una idea de cómo funcionan las consultas anidadas.
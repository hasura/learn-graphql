---
title: "Probar permisos"
metaTitle: "Permisos de prueba | Tutorial de Hasura"
metaDescription: "Explore los permisos de la API GraphQL para la tabla todos y vea cómo se restringe el acceso a los datos"
---

Vamos a seguir adelante y comenzar a probar los permisos a través de la API GraphQL para la `todos`tabla.

## Consulta

Ahora vamos a seguir adelante y consultar los datos añadiendo dos encabezados de petición:

- `x-hasura-role`:`user`
- `x-hasura-user-id`:`1`

```graphql
query {
  todos {
    id
    title
    is_public
    is_completed
    user_id
  }
}
```

Deberías recibir una respuesta que se vea como esto:

![Todo Query](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/todos-permission-testing.png)

Tenga en cuenta que la respuesta recibida se filtra para el id de `1`usuario. Si cambia el valor para `x-hasura-user-id`, `2`los datos se devolverían solo para el id de usuario .`2` Esto confirma los permisos que configuramos en los pasos anteriores.

También puede probar la configuración de permisos de manera similar para la `users`tabla.

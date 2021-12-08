---
title: "Permitir listas"
metaTitle: "Permitir listas | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Allowlist puede configurarse para permitir de forma segura un número limitado de operaciones GraphQL (consultas/mutaciones/suscripciones) para su proyecto."
---

Allowlist puede configurarse para permitir de forma segura un número limitado de operaciones GraphQL (consultas/mutaciones/suscripciones) para su proyecto.

Se pueden agregar operaciones a la lista de permisos

- Uso de la consola
- Uso de metadatos
- Automáticamente a través de Hasura Cloud

## Listado de permisos a través de la consola

Por ejemplo, en nuestra demo slack podemos restringir solo la `users`consulta para pasar y negar todas las demás consultas. Esto se puede hacer dirigiendo a la `Settings`pestaña de la Consola y navegando a la `Allow List`página.

![Permitir listas en la consola](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

Podemos agregar una operación manualmente especificando un nombre de operación y la definición de la operación.

Digamos que el nombre de la operación es `users`y la definición es

```graphql
query {
  users {
    id
    name
  }
}
```

![Permitir la operación de la lista](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

De igual manera, esto puede ser agregado a través de un archivo subiendo manualmente un archivo graphql con la lista de todas las operaciones.

## Listado de permisos a través de metadatos

Las consultas se pueden almacenar en colecciones y una colección se puede agregar o eliminar de la lista permitida. Una colección puede ser agregada a través de las siguientes [API](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections.html#api-query-collections)

## Allowlist a través de Hasura Cloud

Mientras que lo anterior se hace manualmente introduciendo todas las operaciones, Hasura Cloud ofrece una forma rápida de habilitar Allowlist de la lista de operaciones que ya se ejecutaron en el pasado.

Dirígete a la `Allow List`pestaña dentro de la `Pro`pestaña del proyecto Hasura Cloud. `New Operations`A continuación, vaya a ver la lista de operaciones que no están en la lista de permisos todavía.

![Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

En nuestro ejemplo, nos gustaría seleccionar solo la consulta de usuario y por lo tanto podemos seleccionar explicablemente eso de la lista de operaciones en lugar de introducirlas manualmente una por una.

Tenga en cuenta que incluso las consultas de Introspection deben añadirse explicablemente para permitir que la interfaz de GraphiQL funcione y esta pestaña le permite hacerlo rápidamente. Otro consejo que sería útil es que, siempre aseguran que las consultas con nombre se hagan del cliente para que sea más fácil añadirlas a allowlist y también más fácil de inspeccionar y depurar.

## Habilitar la lista de permisos

Allowlist debe ser habilitado explicativamente a través del env `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

Dirígete a la `Env vars`pestaña en la página de configuración del proyecto en Hasura Cloud para habilitar este envase.

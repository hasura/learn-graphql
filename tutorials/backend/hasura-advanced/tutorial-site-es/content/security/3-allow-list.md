---
title: "Listas de permitidos"
metaTitle: "Listas de permitidos | Tutorial avanzado de Hasura GraphQL"
metaDescription: "La lista de permitidos (Allowlist) puede configurarse para permitir, de forma segura, un número limitado de operaciones de GraphQL (consultas/mutaciones/suscripciones) para su proyecto."
---

La lista de permitidos (Allowlist) puede configurarse para permitir, de forma segura, un número limitado de operaciones de GraphQL (consultas/mutaciones/suscripciones) para su proyecto.

Pueden agregarse operaciones a Allowlist

- Mediante la Consola
- Mediante metadatos
- Automáticamente a través de Hasura Cloud

## Allowlist mediante la consola {#allowlist-through-console}

Por ejemplo, en nuestra demostración de slack, podemos restringir para que solo pase la consulta `users` y se denieguen todas las demás. Esto puede lograrse yendo a la pestaña `Settings` en la consola y navegando hasta la página `Allow List`.

![Listas de permitidos en la consola](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/console-allow-lists.png)

Podemos agregar una operación manualmente cuando especificamos el nombre de una operación y la definición de dicha operación.

Pongamos que el nombre de la operación es `users` y que la definición es

```graphql
query {
  users {
    id
    name
  }
}
```

![Funcionamiento de la lista de permitidos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/allow-list-operation.png)

Del mismo modo, también puede agregarse mediante la carga de un archivo, al cargar manualmente un archivo graphql con la lista de todas las operaciones.

## Allowlist mediante metadatos {#allowlist-through-metadata}

Las consultas pueden almacenarse en colecciones y estas pueden agregarse o eliminarse de la lista de permitidos. Puede agregarse una colección a través de las siguientes [API](https://hasura.io/docs/latest/graphql/core/api-reference/schema-metadata-api/query-collections/#api-query-collections)

## Allowlist a través de Hasura Cloud {#allowlist-through-hasura-cloud}

Mientras que lo anterior se realiza introduciendo manualmente todas las operaciones, Hasura Cloud ofrece una forma rápida de habilitar Allowlist desde la lista de las operaciones que ya se hayan ejecutado en el pasado.

Diríjase a la pestaña `Allow List` dentro de la pestaña `Pro` del proyecto Hasura Cloud. A continuación, navegue hasta `New Operations` para consultar la lista de operaciones que aún no están en la lista de permitidos.

![Allowlist de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-cloud-allowlist.png)

En nuestro ejemplo, nos gustaría seleccionar solo la consulta de usuario y por lo tanto podemos seleccionarla de forma explícita en la lista de operaciones, en lugar de introducirlas manualmente una por una.

Tenga en cuenta que incluso las consultas de Introspección han de agregarse de forma explícita para permitir que la interfaz de GraphiQL funcione, y eso es precisamente lo que se logra rápidamente con esta pestaña. Otro consejo que podría resultar de utilidad es asegurarse de que las consultas con nombre se realicen desde el cliente, para que sea más fácil agregarlas a Allowlist y también para que sean más fáciles de inspeccionar y depurar.

## Habilitar Allowlist {#enabling-allowlist}

Allowlist necesita ser habilitado de forma explícita a través del env `HASURA_GRAPHQL_ENABLE_ALLOWLIST`.

Diríjase a la pestaña `Env vars` en la página de configuración del proyecto en Hasura Cloud para habilitar este env.

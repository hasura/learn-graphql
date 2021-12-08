---
title: "Servidores GraphQL"
metaTitle: "Servidores de Graph de GraphQL"
metaDescription: "GraphQL es conocido por sus beneficios en el lado del cliente. Los servidores GraphQL hacen el elevador pesado para garantizar que la cantidad correcta de datos se obtiene con un número mínimo de búsquedas de bases de datos y llamadas API."
---

GraphQL es conocido por sus beneficios en el lado del cliente. Los servidores GraphQL hacen el elevador pesado para garantizar que la cantidad correcta de datos se obtiene con un número mínimo de búsquedas de bases de datos y llamadas API.

La solicitud de GraphQL es `executed`por el servidor con la siguiente información: El esquema del servicio GraphQL, documento GraphQL que contiene las definiciones de operación como el conjunto de selección y los campos.

El servidor pasa por los siguientes pasos:
- Analizar el documento
- Identificar la operación a ejecutar (si más de una)
- Validar la solicitud y los errores de devolución si falla
- Ejecutar la operación (consulta / mutación / suscripción)

Hay muchos enfoques para escribir un servidor GraphQL. Veamos los más comunes que utilizan la comunidad GraphQL.

## Enfoque de Resolver

La forma más común de escribir un servidor GraphQL es definiendo el esquema y escribiendo los resolvers para las diferentes operaciones y campos.

Imagine las soluciones como funciones que contienen instrucciones sobre cómo procesar un campo en particular basado en el contexto.

La firma básica de un resolver se parece a lo siguiente:

```
resolverFunc(data, args, context, info)
```

- `data`- previamente sacó datos del padre.
- `args`- pares de argumentos de valor clave, opcionales.
- `context`- información de estado por solicitud, típicamente utilizada para la lógica de auth
- `info`- metadatos sobre el contexto de selección para traversal.

Esta función resolver se ejecuta ahora para cada campo en una consulta GraphQL.

### Problema de rendimiento N+1

Digamos que tengo que buscar una lista de autores y sus artículos. En una sencilla API REST, la versión ingenua se vería algo como esto:

```
fetchData: async () => ORM.getAuthors().getArticles();
```

Hay dos consultas (SQL) a la base de datos: una para buscar la lista de autores y otra para buscar la lista de artículos de cada autor.

Ahora vamos a hacer esto usando GraphQL.

La consulta de GraphQL para esto se vería algo como esto:

```graphql
query {
  author {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

El resolver se vería algo como:

```
resolvers = {
  Query: {
    author: async () => {
      return ORM.getAllAuthors()
    }
  },
  Author: {
    articles:  async (authorObj, args) => {
      return ORM.getArticlesBy(authorObj.id)
    }
  },
}
```

Bien, ahora veamos cómo se vería la ejecución para esto. Considera que hay 3 autores con cada uno vinculado a 2 artículos.

El primer resolver sería llamado para `author`que devuelva a todos los autores (3 en este caso). `articles`Ahora para la consulta relacional `articles`, el resolver sería llamado una vez por cada autor. Esto lleva a 4 visitas a la base de datos (uno para autor y 3 para artículos) en este enfoque ingenuo.

Puede ver las implicaciones de rendimiento obvia con este enfoque.

### Dataloader

Dataloader es una utilidad que se puede utilizar como parte de la capa de búsqueda de datos de su aplicación. Al tratar de resolver el problema N+1, lo que hace es, espera a que todos los resolvers carguen en sus valores individuales, coalesce todas las cargas individuales y llame a la función de lote con las teclas solicitadas.

## Enfoque de compilador

El lote de resolvers resuelve el problema de rendimiento en gran medida. Reduce múltiples visitas a la base de datos. Pero incluso con el lote, todavía habría múltiples visitas a la base de datos dependiendo de la profundidad de la consulta.

El enfoque del compilador le permite mapear una consulta GraphQL de cualquier profundidad a una consulta de base de datos. Esto es más performante si su consulta GraphQL trata con datos de la base de datos.

Aprenda cómo Hasura realiza [la ejecución de consultas de GraphQL ejecutante](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) utilizando el enfoque del compilador.

## Enfoque híbrido

Si los datos provienen de diferentes fuentes, necesitamos usar una combinación de los enfoques anteriores. El enfoque del compilador funciona bien para las partes de base de datos de la consulta y la búsqueda por lotes de consultas con DataLoader funciona mejor para las fuentes de datos externas / solicitudes HTTP.

La arquitectura de enfoque híbrido utiliza un servidor con una base de datos conectada para operaciones CRUD primarias y utiliza el enfoque de resolución para la ejecución de otros campos que obtienen o mutan datos de diferentes fuentes de datos.

Si está escribiendo su propio servidor GraphQL desde cero, utilizará el enfoque resolver y las funciones de escritura para resolver cada campo de la consulta. En caso de que esté buscando mapear su base de datos a GraphQL para CRU instantáneo, el enfoque del compilador encaja en.

Normalmente, se recomienda un enfoque híbrido, donde se utilizaría un servidor como Hasura que da CRUD instantáneo para bases de datos y también le permite escribir sus propios resolvers en caso de que tenga alguna otra lógica de negocio personalizada.



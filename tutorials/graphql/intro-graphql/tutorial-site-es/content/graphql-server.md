---
title: "Servidores de GraphQL"
metaTitle: "Servidores de GraphQL | Tutorial de GraphQL"
metaDescription: "GraphQL es conocido por sus beneficios en el lado del cliente. Los servidores de GraphQL se encargan del trabajo pesado para garantizar que se obtiene la cantidad justa de datos con un mínimo de consultas a la base de datos y de llamadas a la API."
---

GraphQL es conocido por sus beneficios en el lado del cliente. Los servidores de GraphQL se encargan del trabajo pesado para garantizar que se obtiene la cantidad justa de datos con un mínimo de consultas a la base de datos y de llamadas a la API.

La solicitud GraphQL es `executed` por el servidor con la siguiente información:
 El esquema del servicio GraphQL, el documento GraphQL que contiene la definición de las operaciones, como el conjunto de selecciones y los campos.

El servidor sigue los siguientes pasos:
- Analizar el documento
- Identificar la operación a ejecutar (en caso de que haya más de una)
- Validar la solicitud y devolver errores en caso de fallo
- Ejecutar la operación (consulta/mutación/suscripción)

Hay muchos enfoques distintos para programar un servidor GraphQL. Veamos los que se utilizan con más frecuencia en la comunidad GraphQL.

## Enfoque de resolución {#resolver-approach}

La forma más habitual de programar un servidor GraphQL es definiendo el esquema y escribiendo resoluciones para las diferentes operaciones y campos.

Piense en las resoluciones como funciones que contienen instrucciones sobre cómo procesar un campo en particular en función del contexto.

La firma básica de una resolución tiene un aspecto parecido al siguiente:

```
resolverFunc(data, args, context, info)
```

- `data` - datos obtenidos previamente del principal.
- `args` - pares de argumentos de valor clave, opcionales.
- `context` - información de estado solicitada, normalmente utilizada para la lógica de autenticación
- `info` - metadatos sobre el contexto de selección para el recorrido.

Esta función de resolución se ejecutará ahora para cada campo en las consultas GraphQL.

### Problema de rendimiento N+1 {#performance-problem}

Supongamos que tenemos que obtener una lista de autores y sus artículos. En una API REST sencilla, la versión más simple sería buscar algo así:

```
fetchData: async () => ORM.getAuthors().getArticles();
```

Hay dos consultas (SQL) a la base de datos: una para obtener la lista de autores y otra para obtener la lista de artículos de cada autor.

Ahora vamos a hacerlo utilizando GraphQL.

La consulta GraphQL adecuada tendría un aspecto similar a este:

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

La resolución tendría un aspecto parecido a este:

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

Muy bien, ahora veamos qué aspecto tendría su ejecución. Considere que hay 3 autores y que cada uno está vinculado a 2 artículos.

La primera resolución sería invocada para `author` que nos devolvería todos los autores (3, en este caso). Ahora, para la consulta relacional, `articles`, la resolución `articles` sería invocada una vez por autor. El resultado serían 4 peticiones a la base de datos (una por autor y 3 por los artículos) con este enfoque sencillo.

Las implicaciones de este enfoque en cuestión de rendimiento son obvias.

### Dataloader {#dataloader}

Dataloader es una utilidad que ha de utilizarse como parte de la capa de obtención de datos de su aplicación. Al tratar de resolver el problema N+1, lo que hace es esperar a que todas las resoluciones carguen sus valores individuales, unir todas las cargas individuales y llamar a la función de lotes con las claves solicitadas.

## Enfoque de compilación {#compiler-approach}

La agrupación de resoluciones soluciona el problema de rendimiento en gran medida.
 Reduce el número de peticiones a la base de datos. Pero incluso con la agrupación, seguirán produciéndose múltiples peticiones a la base de datos, dependiendo la profundidad de la consulta.

El enfoque de compilación le permite asignar una consulta GraphQL de cualquier profundidad en una sola consulta a la base de datos. Esto ofrece un mejor rendimiento si su consulta GraphQL gira en torno a los datos en la base de datos.

Descubra cómo Hasura realiza [la ejecución de consultas GraphQL de mejor rendimiento](https://hasura.io/blog/fast-graphql-execution-with-query-caching-prepared-statements/) mediante el enfoque de compilación.

## Enfoque híbrido {#hybrid-approach}

Si los datos provienen de distintas fuentes, necesitaremos utilizar una combinación de los enfoques anteriores. El enfoque de compilación funciona bien para las partes de base de datos de la consulta, y la agrupación de consultas con DataLoader funciona mejor con agrupaciones de fuentes de datos externas/solicitudes HTTP.

La arquitectura de enfoque híbrido utiliza un servidor con una base de datos conectada para las operaciones CRUD primarias y utiliza el enfoque de resolución para la ejecución de otros campos o datos en mutación de diferentes fuentes de datos.

Si está escribiendo su propio servidor GraphQL desde cero, estará utilizando el enfoque de resolución, escribiendo funciones para resolver cada campo de la consulta. En caso de que esté buscando asignar su base de datos en GraphQL para obtener CRUD instantáneas, lo ideal sería el enfoque de compilación.

Normalmente, se recomienda un enfoque híbrido, en el que utilizaría un servidor como Hasura, que ofrece CRUD instantáneas para las bases de datos, y que también le permite programar sus propias resoluciones en caso de contar con alguna otra lógica de negocios personalizada.



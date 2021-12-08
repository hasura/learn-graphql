---
title: "GraphQL Response Caching"
metaTitle: "Tut de almacenamiento en caché de respuesta de Graph de Hasura"
metaDescription: "Hasura GraphQL Engine (OSS) admite Query Caching donde se almacena la representación interna del GraphQL AST totalmente calificado."
---

Hasura GraphQL Engine (OSS) admite Query Caching donde se almacena la representación interna del GraphQL AST totalmente calificado. Cuando se realiza una consulta de GraphQL, el SQL generado es una instrucción preparada con las variables de sesión correctas que golpean la base de datos. Estas declaraciones preparadas ayudan a hacer las consultas rápidamente. Leer más sobre [Query Caching](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/performance.html)

Ahora, algunas consultas son más frecuentemente accedidas que otras. Típicamente, podría haber latencia y tiempos de respuesta lentos debido a la

- Tamaño de la respuesta
- Ubicación del servidor
- Número de llamadas API simultáneas, etc

Hasura Cloud proporciona soporte para las respuestas de consultas en caché. Cuando se consulta con la configuración de caché, Hasura Cloud garantiza que los datos de respuesta se almacenan en caché para mejorar el tiempo de respuesta.

**Nota**: El almacenamiento en caché de respuesta GraphQL está habilitado para proyectos de `Standard`tier Cloud con un tamaño de caché de hasta 100 MB.

## ¿Cómo funciona el almacenamiento en caché?

Hasura tiene metadatos sobre los modelos de datos a través de fuentes de datos y las reglas de autorización a nivel de aplicación. Esto ayuda a Hasura a proporcionar caché de aplicación de extremo a extremo.

La respuesta de una consulta de GraphQL solo se puede almacenar en caché si las siguientes condiciones se mantienen en la mano:

- La consulta no hace uso de esquemas remotos ni de juntas remotas
- La consulta y los permisos de usuario relacionados no hacen uso de variables de sesión
- La respuesta JSON es menor de 100KB en tamaño

Las respuestas en caché se almacenan durante un período de tiempo en una caché LRU (menos (least-recently y se eliminan de la caché según sea necesario según su uso.

Por ejemplo, los `users`registros del modelo slack se accederán con frecuencia. Podemos almacenar en caché esto a través de la siguiente consulta:

```graphql
query slackUsersCached @cached {
  users {
    id
    name
    display_name
    bio
  }
}
```

Tenga en cuenta que en la consulta anterior, hemos incluido la `@cached`directiva para especificar que esta consulta debe ser almacenada en caché. Por `default`la respuesta de esto se almacena en caché para .`60 seconds`

Ahora comprobaremos si la respuesta fue almacenada en caché con éxito. Idealmente la respuesta HTTP incluirá un `Cache-Control`encabezado, que indica el número máximo de segundos para que la respuesta regresada permanezca en la caché. Poste esa hora, se eliminará de la LRU.

![Cabezal de respuesta Cache-Control](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cache-control.png)

Puede ver el valor de la cabecera de respuesta de Cache-Control que indica cuánto más tiempo en segundos se almacenaría esta respuesta.

## Cache Lifetime

La vida útil máxima de una entrada en la caché se puede controlar usando el argumento ttl a la directiva de consulta @cached. El valor es un número entero de segundos:

```graphql
query usersCached @cached(ttl: 300) {
  users {
    id
    name
    display_name
    bio
  }
}
```
En la consulta anterior, hemos incluido un `ttl`argumento para la directiva @cached. Esto se utiliza para especificar cuánto tiempo necesita la caché en su lugar.

El valor máximo permitido es de 300 segundos (5 minutos) y eso es lo que hemos utilizado en la consulta anterior.

Ahora leyendo el `Cache-Control`encabezado, sabrás cuánto tiempo estará la consulta en caché. Los clientes suelen utilizar este encabezado para mantener un seguimiento de las respuestas en caché.

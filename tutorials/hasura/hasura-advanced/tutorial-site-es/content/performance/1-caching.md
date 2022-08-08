---
title: "Caché de respuestas de GraphQL"
metaTitle: "Caché de respuestas de GraphQL | Tutorial avanzado de Hasura GraphQL"
metaDescription: "El motor Hasura GraphQL (OSS) admite el almacenamiento en caché de consultas, donde se almacenará la representación interna del AST de GraphQL completamente cualificado."
---

El motor Hasura GraphQL (OSS) admite el almacenamiento en caché de consultas, donde se almacenará la representación interna del AST de GraphQL completamente cualificado. Cuando se realiza una consulta de GraphQL, el SQL generado es una instrucción preparada con las variables de sesión adecuadas para que estas lleguen a la base de datos. Estas instrucciones preparadas ayudan a realizar consultas rápidamente. Más información sobre [Almacenamiento de consultas en caché](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/performance/)

Ahora bien, algunas consultas son de acceso más frecuente que otras. Normalmente, podría darse una latencia o tiempos de respuesta lentos debido a

- El tamaño de la respuesta
- La ubicación del servidor
- El número de llamadas concurrentes en la API, etc.

Hasura Cloud ofrece soporte para el almacenamiento en caché de las respuestas a las consultas. Cuando la consulta se hace con la configuración de la caché, Hasura Cloud garantiza que los datos de respuesta se almacenan en la caché para mejorar los tiempos de respuesta.

**Nota**: el almacenamiento en caché de respuestas de GraphQL está habilitado para proyectos Cloud de nivel `Standard` con un tamaño de caché de hasta 100 MB.

## ¿Cómo funciona el almacenamiento en caché? {#how-does-caching-work}

Hasura cuenta con metadatos sobre los modelos de datos en todas las fuentes de datos, además de con reglas de autorización a nivel de aplicación. Esto ayuda a Hasura a proporcionar un almacenamiento en caché de aplicaciones de extremo a extremo.

La respuesta de una consulta GraphQL solo puede almacenarse en la caché cuando se cumplen las siguientes condiciones:

- La consulta no hace uso de esquemas ni uniones remotos
- La consulta y los permisos de usuario relacionados no utilizan variables de sesión
- La JSON de respuesta tiene un tamaño inferior a 100 KB

Las respuestas en caché se almacenan durante un tiempo en una caché LRU (menos utilizada recientemente) y se eliminan de la caché según sea necesario en función de su uso.

Por ejemplo, los registros `users` del modelo de slack serán de acceso frecuente. Podemos almacenarlos en la caché mediante la siguiente consulta:

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

Tenga en cuenta que en la consulta anterior hemos incluido una directiva `@cached` para especificar que esta consulta debe ser almacenada en la caché. Por `default` su respuesta se almacena en la caché durante `60 seconds`.

Ahora vamos a verificar si la respuesta ha sido almacenada en caché correctamente.
 Lo ideal sería que la respuesta HTTP incluyese un encabezado `Cache-Control` para indicar el número máximo de segundos que la respuesta devuelta ha de permanecer en la caché. Pasado ese tiempo se eliminará de la LRU.

![Encabezado de la respuesta de Control de caché](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cache-control.png)

Puede consultar el valor del encabezado de la respuesta de Control de caché que indica cuánto tiempo más en segundos va a almacenarse esta respuesta en la caché.

## Vida útil de la caché {#cache-lifetime}

La duración máxima de una entrada en la memoria caché puede controlarse mediante el argumento ttl de la directiva de consulta @cached. El valor es un número entero de segundos:

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
En la consulta anterior, hemos incluido un argumento `ttl` para la directiva @cached. Esto se utiliza para especificar cuánto tiempo debe permanecer la memoria caché en su sitio.

El valor máximo permitido es de 300 segundos (5 minutos) y eso es lo que hemos utilizado en la consulta anterior.

Ahora, al leer el encabezado `Cache-Control`, sabremos cuánto tiempo permanecerá la consulta en la memoria caché. Los clientes suelen utilizar este encabezado para llevar un registro de las respuestas almacenadas en la caché.

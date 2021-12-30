---
title: "GraphQL frente a REST"
metaTitle: "GraphQL frente a REST | Tutorial de GraphQL"
metaDescription: "GraphQL frente a REST. Comparación de las API de GraphQL y REST, destacando las diferencias clave con ejemplos y en detalle sobre cómo se complementan entre sí"
---

GraphQL a menudo se promociona como una alternativa a las API de REST. En esta sección analizaremos las diferencias clave entre GraphQL y REST con un ejemplo y también analizaremos cómo ambas pueden coexistir y complementarse entre sí.

## GraphQL frente a REST: un ejemplo {#example}

Supongamos que tiene una API para buscar el perfil de un usuario y su dirección. En un escenario típico de REST, la solicitud/respuesta sería de esta forma:

![Ejemplo de la API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

El núcleo de la API de REST gira en torno a los recursos. Los recursos se identifican por las URL y el tipo de solicitud (GET, POST, etc.).

Si el servidor de la API fuera un servidor de GraphQL, así serían las llamadas de la API:

![Ejemplo de la API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

Puede ver que la respuesta de JSON es diferente para diferentes «consultas» que envía el cliente.

```
Request1:         |  Response1:

query {           |  {
  user (id: 1) {  |    "user": {
    id            |       "id": 1
  }               |     }
}                 |  }

----------------------------------------

Request2:         |   Response2:

query {           |   {
  user (id: 1) {  |     "user": {
    id            |       "id": 1
    name          |       "name": "Elmo"
  }               |     }
}                 |   }
```

## Pensar en GraphQL {#thinking-in-graphql}

Estamos cambiando la forma en que pensamos sobre las llamadas de API. En lugar de hacer diferentes llamadas de API a diferentes URL para buscar datos, estamos haciendo consultas ad-hoc a un «punto de conexión de URL único» que devuelve datos según la consulta.
- En lugar de obtener (GET) un recurso, publica (POST) una consulta que describe qué datos desea.
- Piense en los datos que devuelve la API como un «gráfico», esto permite realizar consultas para buscar piezas de datos «relacionadas» en una sola toma. En el ejemplo anterior, ha buscado el usuario y la dirección del usuario (como objeto JSON anidado) en la misma llamada a la API en lugar de hacer dos llamadas a la API.
- La «consulta» (query) que envía como datos en la solicitud del POST tiene una estructura y una sintaxis. Este «idioma» se llama GraphQL.

Como puede ver en el ejemplo anterior, las consultas de GraphQL aparecen muy ordenadas y fáciles de leer. Esto se debe a que la consulta es la «forma» de los datos JSON finales que desea. Esta es una de las razones principales que hacen que sea tan divertido trabajar con GraphQL.

## Beneficios de GraphQL {#graphql-benefits}

- **Evita el exceso de búsqueda**: le evita buscar más datos de los que necesita, ya que puede especificar los **campos** exactos que necesita.
- **Evita varias llamadas de API**: en caso de que necesite más datos, también puede evitar realizar varias llamadas a la API. En el caso anterior, no necesita hacer 2 llamadas de API para buscar `user` y `address` por separado.
- **Menos gastos de comunicación con los desarrolladores de API**: a veces para buscar los datos exactos que necesita, especialmente si necesita buscar más datos y desea evitar varias llamadas de API, necesitará pedir a los desarrolladores de API que creen una nueva API. ¡Con GraphQL, su trabajo es *independiente* del equipo de API! Esto le permite trabajar más rápido en su aplicación.
- **Autodocumentación**: cada API de GraphQL cumple con un «esquema» que es el modelo de datos del gráfico y qué tipos de consultas puede hacer un cliente. Esto permite a la comunidad crear muchísimas herramientas interesantes para explorar y visualizar la API o crear extensiones de entornos de desarrollo integrado que autocompletan las consultas de GraphQL e incluso hacen «codegen». ¡Entenderemos esto con más detalle más adelante!

Aquí hay un gráfico rápido para mostrarle las analogías de GraphQL de los términos típicos como los de REST:

| Requisito | REST | GraphQL |
| :-- | :-- | :-- |
| Búsqueda de objetos de datos | GET | query |
| Insertar datos | POST | mutation |
| Actualización/eliminación de datos | PUT/PATCH/DELETE | mutation |
| Observación/suscripción a los datos | - | subscription |

### Sistema de tipo y esquema {#schema-and-type-system}

En las API de REST, no hay un concepto de un sistema de tipo o esquema. Por otro lado, GraphQL tiene un sistema de tipo fuerte para definir cómo se ve la API. Un esquema se define con campos asignados a tipos y sirve como un contrato entre el cliente y el servidor.

Este contrato de esquema permite que los desarrolladores de frontend y backend trabajen de forma independiente con una garantía de que se cumplen los requisitos de datos. En las API de REST, aunque no haya un contrato estricto, si sigue la especificación de OpenAPI se acercará a GraphQL en términos de documentación. Las herramientas comunitarias en torno a la especificación de OpenAPI ofrecen una idea sobre los diversos puntos de conexión y cargas de datos para las API de REST.

### Códigos de estado de HTTP {#http-status-codes}

Cada solicitud, éxito o error de GraphQL debe devolver un 200. Esta es una diferencia visible en comparación con las API de REST, en el que cada código de estado señala a un cierto tipo de respuesta.

| Código de estado | REST | GraphQL |
| :-- | :-- | :-- |
| 200 | Bien | Bien |
| 400 | Solicitud incorrecta | - |
| 401 | No autorizado | - |

Con las API de REST, los errores pueden ser cualquier cosa menos 200 y el cliente que administra el error debe encargarse de los diferentes códigos posibles.

Con GraphQL, cualquier respuesta válida (tanto datos como errores) debe ser 200. Los errores se manejan como parte del cuerpo de respuesta bajo un objeto `errors` especial y las herramientas del lado del cliente ayudarán a manejarlo mejor.

#### Supervisión {#monitoring}

Con las API de REST y los códigos de estado HTTP adecuados, un simple control de estado en un punto de conexión dado debe dar una idea sobre el estado de tiempo de actividad de la API. Un código de estado 200 significa que la API está funcionando bien, mientras que un 5xx significa que algo está mal con el servidor. Esto no es tan fluido con GraphQL, ya que la herramienta de supervisión tiene que analizar el cuerpo de respuesta para ver si el servidor está devolviendo datos o errores.

## Caché {#caching}

Con las API de REST, todos los puntos de conexión GET se pueden poner en caché en el lado del servidor o usar un CDN. El navegador también puede ponerlos en caché y el cliente puede ponerles un marcador para invocaciones frecuentes. GraphQL no sigue la especificación de HTTP y se sirve en un solo punto de conexión, generalmente (/graphql). Por lo tanto, las consultas no se pueden poner en caché de la misma manera que las API de REST.

Sin embargo, poner en caché en el lado del cliente es mejor que REST debido a las herramientas. Algunos de los clientes que implementan la capa de caché (Apollo Client, URQL) utilizan el sistema de tipo y esquema de GraphQL usando introspección para permitirles mantener un caché en el lado del cliente.

Aprenderemos más sobre introspección en las siguientes secciones.



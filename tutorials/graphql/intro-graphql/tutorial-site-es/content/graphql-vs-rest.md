---
title: "GraphQL vs REST"
metaTitle: "Tutorial de Graph de Graph de"
metaDescription: "Gráfico vs REST. Comparación de las API GraphQL y REST, destacando las diferencias clave con ejemplos y detalladamente sobre cómo se complementan entre sí"
---

GraphQL es a menudo promocionado como una alternativa a las API REST. En esta sección, veremos las diferencias clave entre GraphQL y REST con un ejemplo y también veremos cómo ambos pueden coexistir y complementarse entre sí.

## GraphQL vs REST: un ejemplo

Supongamos que tiene una API para buscar el perfil de un usuario y su dirección. En un escenario típico de REST, esto es lo que la solicitud / respuesta sería como:

![Ejemplo de API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/rest-api.png)

El núcleo de REST API gira en torno a los recursos. Los recursos son identificados por URLs y tipo de solicitud (GET, POST, etc.).

Si su servidor API era un servidor GraphQL en su lugar, esto es lo que sus llamadas API se verían:

![Ejemplo de API de GraphQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-api.gif)

Puede ver que la respuesta JSON es diferente para diferentes "consultas" enviadas por el cliente.

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

## Pensando en GraphQL

Estamos cambiando la forma en que pensamos sobre las llamadas API. En lugar de hacer diferentes llamadas de API a diferentes URLs para obtener datos, estamos haciendo consultas ad-hoc a un "punto final de URL único" que devuelve datos basados en la consulta.
- En lugar de 'obtener un recurso que 'POST' una consulta que describe los datos que desea.
- Piensa en los datos que devuelve tu API como un "gráfico", esto le permite realizar consultas para obtener datos "relacionados" en una sola toma. En el ejemplo anterior, obtendrá el usuario y la dirección del usuario (como objeto JSON anidado) en la misma llamada de API, en lugar de realizar dos llamadas de API.
- La "consulta" que envía como datos en la solicitud POST tiene una estructura y una sintaxis. Este "idioma" se llama GraphQL.

Como puede ver en el ejemplo anterior, las consultas GraphQL se ven muy ordenadas y fáciles de ¡Leer! Esto se debe a que la consulta es la "forma" de los datos JSON finales que desea. Esta es una de las razones clave que hace de GraphQL una alegría para trabajar!

## Beneficios de GraphQL

- **Evite over-fetching**: evite obtener más datos de los que necesite, porque puede especificar los **campos** exactos que necesita.
- **Evite varias llamadas de** API: En caso de que necesite más datos, también puede evitar realizar varias llamadas a su API. En el caso anterior, no es necesario hacer 2 llamadas API para obtener `user`y por `address`separado.
- **Menos comunicación por adelantado con los desarrolladores de API**: A veces para obtener los datos exactos que necesita, especialmente si necesita obtener más datos y desea evitar múltiples llamadas API, deberá pedirle a sus desarrolladores de API que creen una nueva API. ¡Con GraphQL, tu trabajo es *independiente* del equipo de API! Esto te permite trabajar más rápido en tu aplicación.
- **Self-documenting**: Cada API GraphQL se ajusta a un "esquema" que es el modelo de datos de gráficos y qué tipo de consultas puede hacer un cliente. Esto permite a la comunidad construir un montón de herramientas interesantes para explorar y visualizar su API o crear plugins IDE que autocomplete sus consultas GraphQL e incluso hagan "codegen". ¡Lo entenderemos más detalladamente más adelante!

Aquí hay una tabla rápida para mostrarle los análogos GraphQL de términos típicos REST-ish:

| Requisito | DESCANSO | GraphQL |
| :-- | :-- | :-- |
| Objetos de datos de búsqueda | - GET | Consulta |
| Insertar datos | POST | mutación |
| Actualización/eliminación de datos | PUT/PATCH/ELIMINAR | mutación |
| Avistamiento / suscripción a los datos | - | Suscripción |

### Sistema de Esquema y Tipo

En las API REST, no hay un concepto de esquema o sistema de tipo. Por otro lado, GraphQL tiene un sistema de tipo fuerte para definir cómo se ve la API. Un esquema se define con campos asignados a tipos y sirve como un contrato entre el cliente y el servidor.

Este contrato de esquema permite a los desarrolladores de frontend y backend trabajar de forma independiente con la garantía de que se cumplen los requisitos de datos. En las API REST aunque no hay un contrato estricto, siguiendo la especificación de OpenAPI te acercará a GraphQL en términos de documentación. Las herramientas comunitarias alrededor de la especificación OpenAPI ofrecen una idea sobre los distintos puntos finales y cargas de datos para las API REST.

### Códigos de estado HTTP

Cada solicitud, éxito o error de GraphQL debe devolver un 200. Esta es una diferencia visible en comparación con las API REST donde cada código de estado apunta a un cierto tipo de respuesta.

| Código de Estado | DESCANSO | GraphQL |
| :-- | :-- | :-- |
| 200 | - ¿Está bien? | - ¿Está bien? |
| 400 | Mal Petición | - |
| 401 | No autorizado | - |

Con las API REST, los errores pueden ser algo diferente a 200 y el cliente que gestiona el error debe ocuparse de los diferentes códigos que son posibles.

Con GraphQL, cualquier respuesta válida (tanto datos como errores) debe ser 200. Los errores se manejan como parte del cuerpo de respuesta bajo un `errors`objeto especial y las herramientas del lado del cliente ayudarán a manejarlo mejor.

#### Monitoreo

Con las API REST y los códigos de estado HTTP adecuados, una simple comprobación de salud en un punto final dado debe dar una idea sobre el estado de tiempo de actividad de la API. Un código de estado 200 significa que la API está en marcha y está en ejecución, donde como un 5xx significa que algo está mal con el servidor. Esto no es tan inútil con GraphQL ya que la herramienta de monitoreo tiene que analizar el cuerpo de respuesta para ver si el servidor está devolviendo datos o error.

## Caching

Con las API REST, todos los puntos finales GET se pueden guardar en caché en el lado del servidor o usar un CDN. También pueden ser almacenados en caché por el navegador y marcarlos por el cliente para invocaciones frecuentes. GraphQL no sigue la especificación HTTP y se sirve en un único punto final, generalmente (/graphql). Por lo tanto, las consultas no se pueden almacenar en caché de la misma manera que las API REST.

Sin embargo, el almacenamiento en caché en el lado del cliente es mejor que REST debido a las herramientas. Algunos de los clientes que implementan la capa de caché (Apollo Client, URQL) utilizan el esquema y el sistema de tipo de GraphQL usando Introspection para permitirles mantener una caché en el lado del cliente.

Aprenderemos más sobre Introspección en las secciones que se coming



---
title: "¿Qué es GraphQL?"
metaTitle: "¿Qué es GraphQL? | Tutorial de gráficos"
metaDescription: "¿Qué es GraphQL? GraphQL es una especificación para cómo hablar con una API. Esta parte también cubre GraphQL vs REST con un ejemplo y te toma las ventajas de GraphQL"
---

## ¿Qué es GraphQL?
GraphQL es una especificación para cómo hablar con una API. Se usa normalmente sobre HTTP donde la idea clave es `POST`una "consulta" a un punto final HTTP, en lugar de golpear diferentes puntos finales HTTP para diferentes recursos.

GraphQL está diseñado para que los desarrolladores de aplicaciones web/móviles (clientes HTTP) puedan hacer llamadas a la API para obtener exactamente los datos que necesitan de sus API de backend.

Antes de ir más allá en la comprensión de GraphQL, es útil tener una idea de cómo GraphQL se utiliza en realidad en un cliente HTTP.

## Gráfico en HTTP
Echa un vistazo al diagrama a continuación, para obtener una idea de cómo se utiliza el GraphQL en su pila:

![Gráfico en HTTP](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### Flujo cliente-servidor de GraphQL:

1. Tenga en cuenta que la consulta GraphQL no es realmente JSON; parece la forma de la JSON que *quieres*. Así que cuando hacemos una solicitud de 'POST' para enviar nuestra consulta GraphQL a el servidor, se envía como una "cadena" por el cliente.
2. El servidor obtiene el objeto JSON y extrae la cadena de consultas. Según el Sintaxis de GraphQL y el modelo de datos de gráficos (esquema de GraphQL), el servidor procesa y valida la consulta de GraphQL.
3. Al igual que un servidor API típico, el servidor API GraphQL hace llamadas a un base de datos u otros servicios para obtener los datos que el cliente solicita.
4. El servidor toma los datos y los devuelve al cliente en un objeto JSON.

### Ejemplo Configuración de cliente GraphQL:

En tu trabajo diario, en realidad no necesitas preocuparte por lo subyacente. HTTP peticiones y respuestas.

Al igual que cuando trabajas con una API REST y usas un cliente HTTP para reducir la placa de caldera en la realización de llamadas y respuestas de manejo, puedes elegir un cliente GraphQL para realizar consultas de GraphQL, enviándolas y manejar respuestas mucho más fácil.

De hecho, el mecanismo de cómo envía la consulta GraphQL y acepta el GraphQL la respuesta se ha convertido en estándar. Esto hace que trabajar con GraphQL sea muy fácil en el cliente.

Esto es lo que una configuración de cliente gráfica típica y hacer una consulta se vería:

```javascript

// Setup a GraphQL client to use the endpoint

const client = new Client("https://myapi.com/graphql");


// Now, send your query as a string (Note that ` is used to create a multi-line
// string in javascript).

client.query(`
  query {
    user {
      id
      name
    }
  }`);
```

Tenga en cuenta que puede hacer una llamada de API de GraphQL usando una `fetch`API de JavaScript simple y en realidad no necesita un cliente de GraphQL para casos de uso simples. Vamos a ver esto más en la sección de Cliente GraphQL más adelante.

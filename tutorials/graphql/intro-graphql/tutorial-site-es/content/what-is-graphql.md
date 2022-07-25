---
title: "¿Qué es GraphQL?"
metaTitle: "¿Qué es GraphQL? | Tutorial de GraphQL"
metaDescription: "¿Qué es GraphQL? GraphQL es una especificación de cómo hablar con una API. Esta parte también cubre GraphQL frente a REST con un ejemplo y brinda las ventajas de GraphQL"
---

## ¿Qué es GraphQL? {#what-is-graphql}
GraphQL es una especificación de cómo hablar con una API. Se utiliza normalmente sobre HTTP donde la idea principal es `POST` una «consulta» a un punto de conexión HTTP, en lugar de dirigirse a diferentes puntos de conexión HTTP para buscar diferentes recursos.

GraphQL está diseñado para que los desarrolladores de aplicaciones web/móviles (clientes HTTP) puedan hacer llamadas de API para buscar exactamente los datos que necesitan de las API de backend.

Antes de ir más allá en la comprensión de GraphQL, es útil obtener una idea de cómo se utiliza GraphQL en realidad en un cliente de HTTP.

## GraphQL sobre HTTP {#graphql-over-http}
Mire el siguiente diagrama para obtener una idea de cómo se utiliza GraphQL en la pila:


![GraphQL sobre HTTP](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### Flujo de servidor-cliente de GraphQL: {#graphql-client-server-flow}

1. Tenga en cuenta que la consulta de GraphQL no es realmente JSON; se ve como la forma de
   JSON que *busca*. Así que cuando hacemos una solicitud de «POST» de enviar la consulta
   de GraphQL al servidor, el cliente lo envía como una «cadena».
2. El servidor obtiene el objeto JSON y extrae la cadena de consulta. Según la sintaxis de
   GraphQL y el modelo de datos de gráfico (esquema de GraphQL), el servidor procesa y valida la consulta de GraphQL.
3. Al igual que un servidor de API típico, el servidor de API de GraphQL hace llamadas a una
   base de datos u otros servicios para buscar los datos que el cliente solicitó.
4. El servidor toma los datos y los devuelve al cliente en un objeto JSON.

### Ejemplo de configuración de cliente de GraphQL: {#example-of-graphql-client-setup}

En el trabajo diario, no necesita preocuparse de las respuestas y solicitudes
de HTTP subyacentes.

Al igual que cuando trabaja con una API de REST y utiliza un cliente HTTP para reducir el texto reutilizable al hacer llamadas de API y gestionar respuestas, puede elegir un cliente de GraphQL para hacer que escriba consultas de GraphQL, enviándolas y gestionando respuestas de forma mucho más fácil.

De hecho, el mecanismo de cómo envía la consulta de GraphQL
y acepta la respuesta de GraphQL se ha convertido en estándar. Esto hace que trabajar con GraphQL sea muy fácil para el
cliente.

Esto es cómo se vería una configuración de cliente de GraphQL típica y hacer una consulta:

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

Tenga en cuenta que puede hacer una llamada de API de GraphQL utilizando una API `fetch` sencilla de JavaScript y no necesita un cliente de GraphQL para casos de uso simples. Más adelante, analizaremos esto en la sección de cliente de GraphQL.

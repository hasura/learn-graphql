---
title: "Arquitectura"
metaTitle: "Arquitectura de GraphQL | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Descubra la arquitectura de GraphQL, GraphQL sobre HTTP, el modelo cliente-servidor con un ejemplo de petición http"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/what-is-graphql/"
---

Antes de profundizar más en la comprensión de GraphQL, sería útil tener una idea de cómo
 se utiliza GraphQL en la práctica, en un cliente HTTP (normalmente una aplicación web/móvil).

## GraphQL sobre HTTP
Eche un vistazo al siguiente diagrama para hacerse una idea de cómo suele utilizarse GraphQL en
 su pila:

![GraphQL sobre HTTP](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphql-on-http.png)

### Flujo cliente-servidor de GraphQL:

1. Tenga en cuenta que la consulta de GraphQL no es realmente JSON; sino que tiene una forma similar a la
    JSON que usted *desea*. Así que cuando realizamos una petición «POST» para enviar nuestra consulta de GraphQL al
    servidor, es enviada en forma de «cadena» por el cliente.
2. El servidor obtiene el objeto JSON y extrae la cadena de consulta. Según la
    sintaxis de GraphQL y el modelo de datos del gráfico (esquema de GraphQL), el servidor procesa
    y valida la consulta de GraphQL.
3. Como haría un servidor API típico, el servidor de la API de GraphQL hace llamadas a una base de datos u otros servicios para obtener los datos solicitados por el cliente.
4. El servidor toma los datos y los devuelve al cliente en un objeto JSON.

### Ejemplo de configuración de cliente de GraphQL:

Normalmente, en su trabajo cotidiano, uno no tienen por qué preocuparse por las
 solicitudes y respuestas HTTP subyacentes.

Igual que cuando se trabaja con una API de REST y se utiliza un cliente HTTP
 para reducir la repetición de llamadas a la API y la gestión de las respuestas, podemos
 escoger un cliente de GraphQL que haga mucho más sencillo escribir las consultas de GraphQL, enviarlas y
 gestionar después las respuestas.

De hecho, el mecanismo según el cual enviamos la consulta de GraphQL y aceptamos la respuesta
 de GraphQL se ha convertido en estándar. Esto hace que trabajar con GraphQL sea muy fácil para el
 cliente.

Así es cómo se verían una configuración de cliente de GraphQL típica y hacer una consulta:

```javascript

// Setup a GraphQL client to use the endpoint

const client = new client("https://myapi.com/graphql");


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

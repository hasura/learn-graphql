---
title: "Clientes de GraphQL"
metaTitle: "Clientes de GraphQL | Tutorial de GraphQL"
metaDescription: "Los clientes de GraphQL pueden ayudar a mejorar las consultas, el almacenamiento en caché y la creación de módulos reutilizables. Vamos a ver por qué nos hace falta un cliente de GraphQL y las populares bibliotecas de cliente disponibles"
---

En esta sección, analizaremos cómo los clientes de GraphQL especializados pueden ayudar a mejorar las consultas, el almacenamiento en caché y la creación de módulos reutilizables.

Se puede hacer una solicitud de GraphQL utilizando la API de obtención de datos nativa de JavaScript. Por ejemplo, para obtener una lista de autores, podemos hacer la consulta utilizando el siguiente código:

```javascript
const limit = 5;
const query = `query author($limit: Int!) {
    author(limit: $limit) {
        id
        name
    }
}`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: { limit },
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
```

Esto por supuesto, presupone que el servidor acepta solicitudes de GraphQL sobre HTTP. (Recuerde que GraphQL no se casa con ningún protocolo).

## ¿Para qué necesito un cliente GraphQL? {#why-do-i-need-a-graphql-client}

Ahora que hemos aprendido que las solicitudes pueden hacerse utilizando el antiguo método de obtención de la API, ¿qué sentido tiene un cliente GraphQL?

#### Construir una consulta, procesar la respuesta {#constructing-query-processing-response}

Un cliente de GraphQL puede ayudar a construir la consulta completa con nada más que el documento de GraphQL como entrada, con encabezados relevantes e información de contexto. Así que, en lugar de escribir, cada vez, la llamada de obtención de la API, se encargará de ello para que usted disponga de los datos de respuesta y error tras su análisis.

#### Gestionar el estado de la interfaz de usuario {#managing-ui-state}

El cliente GraphQL también es útil a la hora de gestionar el estado de la interfaz de usuario y sincronizar datos a través de los múltiples componentes de la interfaz de usuario.

#### Actualizar la caché {#updating-cache}

El cliente GraphQL también puede utilizarse para gestionar las entradas almacenadas en la caché de los datos obtenidos a partir de las consultas o mutaciones. Las actualizaciones reactivas a la interfaz de usuario mencionadas anteriormente se logran utilizando una caché.

Los clientes GraphQL más populares en la comunidad son [Apollo Client](https://github.com/apollographql/apollo-client) y [Relay](https://github.com/facebook/relay).

## Clientes de GraphQL fluidos {#fluent-graphql-clients}

Cuando escribe consultas o mutaciones de GraphQL con un cliente, notará que hablamos de una cadena «cruda» con una sintaxis propia. Esta cadena suele convertirse en una consulta GraphQL válida mediante el uso de bibliotecas externas.

Con un cliente de GraphQL fluido, podría escribir estas consultas como objetos. Las API fluidas buscan hacer que el código sea más legible mediante el encadenamiento de métodos, devolviendo this o self desde cada método. Los clientes de GraphQL fluidos le permiten escribir su consulta como objeto, que pueden a continuación convertir, entre bastidores, en una cadena de consulta.

Además de evitarle las cadenas, le ofrecen
- Excelente escritura
- Una única fuente de verdad para las definiciones de tipos
- Autocompletado de las consultas

Aquí puede consultar una [lista de los clientes de GraphQL fluidos](https://github.com/hasura/awesome-fluent-graphql) disponibles para probar.


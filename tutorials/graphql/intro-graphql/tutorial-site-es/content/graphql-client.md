---
title: "Clientes de GraphQL"
metaTitle: "Tutorial de | de clientes de GraphQL"
metaDescription: "Los clientes GraphQL pueden ayudar con mejores módulos de consulta, almacenamiento en caché y construcción reutilizables. Veamos por qué necesitamos un cliente GraphQL y las bibliotecas de clientes populares disponibles"
---

En esta sección, veremos cómo los clientes especializados de GraphQL pueden ayudar a mejorar la consulta, el almacenamiento en caché y la construcción de módulos reutilizables.

Una solicitud de GraphQL se puede hacer usando la API nativa de JavaScript Fetch. Por ejemplo, para obtener una lista de autores, podemos hacer la consulta usando el siguiente código:

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

Esto por supuesto, supone que su servidor acepta solicitudes GraphQL sobre HTTP. (¿Recuerda que GraphQL es agnóstico del protocolo?).

## ¿Por qué necesito un cliente GraphQL?

Ahora que ha aprendido que las solicitudes se pueden hacer utilizando el método de la API de búsqueda antigua, ¿cuál es el punto de un cliente GraphQL?

#### Construyendo consulta, procesamiento de respuesta

Un cliente GraphQL puede ayudar a construir la consulta completa con el documento GraphQL como entrada con encabezados e información de contexto relevantes. Así que en lugar de escribir la llamada de la API de búsqueda cada vez, el cliente se encargará de que usted proporcione los datos de respuesta y el error después de parsing.

#### Gestión del Estado de la UI

El cliente GraphQL también es útil para administrar los datos de estado de la interfaz de usuario y sincronizar los datos de múltiples componentes de la interfaz de usuario.

#### Actualización de caché

El cliente GraphQL también se puede utilizar para gestionar entradas en caché de datos obtenidas desde consultas o mutación. Las actualizaciones reactivas de la interfaz de usuario como se mencionó anteriormente se consiguen utilizando una caché.

Los clientes populares de GraphQL en la comunidad son [Apollo Client](https://github.com/apollographql/apollo-client) y [Relay](https://github.com/facebook/relay).

## Clientes Fluentes GraphQL

Cuando escribes consultas o mutaciones de GraphQL usando un cliente, notarías que es solo una cadena sin procesar con su propia sintaxis. Esta cadena se analiza en una consulta gráfica válida utilizando bibliotecas externas.

Con los clientes fluidos de GraphQL, puede escribir estas consultas como objetos. Las API fluentes tienen como objetivo hacer que el código sea más legible mediante la encadenación del método devolviendo esto o yo desde cada método. Los clientes GraphQL fluentes le permiten escribir su consulta como un objeto, que luego se convierten en una consulta de cadena detrás de escenas.

Además de liberarte de las cuerdas, ofrecen
- Escritura fuerte
- Fuente única de verdad para definiciones de tipo
- Autocompletado de consultas

Aquí hay una [lista de los clientes fluentes de GraphQL](https://github.com/hasura/awesome-fluent-graphql) que puedes probar.


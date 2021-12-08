---
title: Consultas - Datos de búsqueda
metaTitle: "Preguntas de GraphQL para obtener datos | Tutorial de GraphQL"
metaDescription: "Pruebe la consulta GraphQL con GraphiQL. Ejemplo de consulta de GraphQL con parámetros, argumentos y variables para obtener datos dinámicamente"
---

## Pruebe las consultas de GraphQL

Para este tutorial hemos configurado una API GraphQL para usted. Los más comunes la forma de navegar por una API de GraphQL es usar GraphiQL. GraphiQL es una herramienta construido por Facebook, (pronunciado "gráfico") que hace que sea fácil de explorar cualquier API de GraphQL.

Cuando conecta GraphiQL a un punto final GraphQL, se consulta el servidor para su esquema GraphQL y le da una interfaz de usuario para navegar y probar las consultas, y eso alimenta su increíble autocompletado!

![GraphiQL demo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

Herramientas como GraphiQL hacen que las API de GraphQL sean realmente fáciles para utilizar e integrar API en tu aplicación sin necesidad de herramientas de documentación externa.

Puedes acceder al GraphiQL para este tutorial de aplicación en tiempo real aquí: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

Cuando trabajas con una API GraphQL en un proyecto casi siempre Utilice una herramienta como GraphiQL para explorar y probar sus consultas de GraphQL.

## Consulta básica de GraphQL

1. Abra GraphiQL en: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql). Tendrás que iniciar sesión para obtener un token de auth para consultar la API. En un escenario del mundo real tus API de GraphQL estarán protegidas.
2. Verás una URL y encabezados que contienen la dirección de la token que se enviará junto con su consulta GraphQL.
3. Ahora, pega esta consulta GraphQL en la ventana de GraphiQL

```graphql
 query {
   users {
     name
   }
 }
```

4. Pulse `ctrl + enter`o `cmd + enter`(mac) o haga clic en el icono ▶️ para ejecutar la consulta de GraphQL
5. A la derecha, deberías ver una lista de usuarios por sus nombres que están en el sistema!

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

¡Recuerda que aquí no hay magia! La aplicación GraphiQL alojada está enviando una cadena de consulta de GraphQL al servidor en el punto final dado con los encabezados HTTP. El servidor envía la respuesta que ves en el lado derecho.

## "grafias"

Nuestra aplicación todo tiene usuarios, todos e información sobre usuarios que están actualmente en línea. Esto es lo que nuestra API "esquema" se ve como:

![Esquema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

Como puedes ver, es un "gráfico" como esquema donde todos los 3 modelos están unidos entre sí.

Intentemos hacer consultas que obtengan diferentes porciones de nuestros datos del "gráfico" general.

### Los usuarios de búsqueda y sus todos

Esta consulta de GraphQL atraerá a todos los usuarios y sus todos públicamente visibles:

```graphql
 query {
   users {
     name
     todos {
       title
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>


### Fetch usuarios en línea y su información de perfil

Esta consulta de GraphQL buscará a todos los usuarios en línea actualmente y su información de perfil (que es solo su nombre por ahora):

```graphql
 query {
   online_users {
     last_seen
     user {
       name
     }
   }
 }
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>


## Añadir parámetros (argumentos) a las consultas GraphQL

En la mayoría de las llamadas API, normalmente se utilizan parámetros. Por ejemplo, para especificar qué datos se están obteniendo . Si estás familiarizado con hacer `GET`llamadas, habrías usado un parámetro de consulta. Por ejemplo, para obtener solo 10 todos que puede haber hecho esta llamada API: `GET /api/todos?limit=10`.

El analógico de consulta de GraphQL de esto es *argumentos* que se pueden adjuntar a un "campo".

### argumento básico: Fetch 10 todos

Esta consulta GraphQL obtendrá 10 todos y no todos ellos.

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

El bit más importante para comprobar aquí es `limit: 10`. Los servidores GraphQL proporcionarán una lista de argumentos que se pueden usar en `()`campos específicos. En nuestro caso, estamos usando Hasura para crear el backend GraphQL que proporciona filtro, ordenar y argumentos de paginación. El servidor o API GraphQL que utiliza, puede proporcionar un conjunto diferente de argumentos que se pueden utilizar.

### Múltiples argumentos en varios campos: Fetch 1 usuario y 5 todos más recientes para cada usuario

```graphql
query {
  users (limit: 1) {
    id
    name
    todos(order_by: {created_at: desc}, limit: 5) {
      id
      title
    }
  }
}
```

Observe que estamos pasando argumentos a diferentes campos. Esta consulta de GraphQL dice como:
> Los usuarios de búsqueda (con límite 1), y sus todos (ordenados por el tiempo de creación descendente, y limitado a 5).

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

<a name="query-variables"></a>

## Variables GraphQL: Pasar argumentos a sus consultas dinámicamente

Esto es genial, pero todavía tenemos un problema. Si queremos crear una consulta donde estamos buscando datos con argumentos que se proporcionan dinámicamente, tendríamos que crear toda la cadena de consulta de nuevo.

Esto es lo que no queremos hacer:

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

¡Afortunadamente, no tenemos que hacer esto! Las variables GraphQL son variables adicionales que puede enviar en una consulta para que los "argumentos" puedan ser proporcionados dinámicamente!

## Número de $limit de todos

Esto es lo que nuestra consulta GraphQL se vería:
```graphql
query ($limit: Int!) {
  todos(limit: $limit) {
    id
    title
  }
}
```

Además de la consulta anterior, enviamos un objeto de variables:

```json
{
   "limit": 10
}
```

Ahora en lugar de enviar solo la consulta al servidor GraphQL, desde nuestro cliente Enviaremos tanto la consulta como las variables. El servidor GraphQL utilizará el variable en el lugar correcto en la consulta automáticamente para nosotros!

Vamos a probar esto en GraphiQL:
1. Ir a GraphiQL
2. Escribe esta consulta
3. Desplázate hasta la parte inferior de la página, donde verás un panel más pequeño "Variables de consulta"
4. Añadir la variable de consulta como un objeto JSON

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

## Resumen

- Ahora puede hacer consultas de GraphQL
- Sabes cómo pasar argumentos a tus consultas GraphQL
- Usted sabe cómo hacer sus argumentos dinámicos mediante el uso de variables de consulta

A continuación, vamos a ver la escritura de datos y no solo la obtención de datos!

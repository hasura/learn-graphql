---
title: Obtención de datos - Consultas
metaTitle: "Consultas de GraphQL para la obtención de datos | Tutorial de Hooks Apollo con React en GraphQL"
metaDescription: "Pruebe las consultas de GraphQL usando GraphiQL. Un ejemplo de consulta de GraphQL con parámetros, argumentos y variables para buscar datos dinámicamente"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-queries/"
---

## Pruebe las consultas de GraphQL

Para este tutorial hemos configurado una API de GraphQL por usted. La manera más común
 de navegar por una API de GraphQL es utilizar GraphiQL. GraphiQL es una herramienta
 creada por Facebook, (se pronuncia "gráfical") que facilita la exploración
 de cualquier API de GraphQL.

Cuando GraphiQL se conecta a cualquier punto de conexión de GraphQL,
 solicita el esquema GraphQL del servidor y nos ofrece una interfaz de usuario para navegar
 y probar consultas, y eso es lo que alimenta a su increíble función autocompletar.

![Demostración de GraphiQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

Herramientas como GraphiQL hacen que las API de GraphQL sean realmente fáciles
 de usar y de integrar en su aplicación sin necesidad de
 herramientas de documentación externa.

Puede acceder aquí al GraphiQL para este tutorial de la aplicación de tareas pendientes en tiempo real:
 [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

Cuando trabaja con una API de GraphQL en un proyecto, casi siempre
 utilizará una herramienta como GraphiQL para explorar y probar sus consultas de GraphQL.

## Consulta básica de GraphQL

1. Abra GraphiQL en: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql). Tendrá que iniciar sesión para obtener un token de autorización para consultar la API. En un escenario realista
    sus API de GraphQL estarán protegidas.
2. Verá una URL, y encabezados que contienen el token
    auth que se enviará junto con su consulta de GraphQL.
3. Ahora, pegue esta consulta de GraphQL en la ventana de GraphiQL

```graphql
 query {
   users {
     name
   }
 }
```

4. Pulse `ctrl + enter` o `cmd + enter` (mac) o haga clic en el icono ▶️ para ejecutar la consulta de GraphQL
5. A la derecha debería ver una lista de usuarios ordenada por sus nombres en el sistema.

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

¡Recuerde que aquí no hay magia! La aplicación de GraphiQL alojada envía una cadena de consulta de GraphQL
 al servidor en el punto de conexión dado junto a los encabezados HTTP. El servidor envía entonces la respuesta
 que puede ver en el lado derecho.

## Obtención de «gráficos»

Nuestra aplicación de tareas pendientes tiene usuarios, tareas pendientes e información sobre los usuarios que están actualmente en línea. Este es el aspecto de nuestro «esquema» de la API:

![Esquema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

Como puede ver, es un esquema tipo «gráfico», en el que los 3 modelos están vinculados entre sí.

Probemos a hacer consultas que obtengan diferentes porciones de los datos del «gráfico» general.

### Obtención de usuarios y sus tareas pendientes

Esta consulta de GraphQL buscará todos los usuarios y sus tareas pendientes de acceso público:

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

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>


### Obtención de usuarios y su información de perfil

Esta consulta de GraphQL obtendrá todos los usuarios actualmente en línea
 y su información de perfil (que por ahora tan solo consta de su nombre):

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

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>


## Adición de parámetros (argumentos) a las consultas de GraphQL

En la mayoría de las llamadas de la API utilizaremos, por lo general, parámetros. Para especificar, por ejemplo, qué datos estamos obteniendo.
 Si está familiarizado con hacer llamadas `GET`, habrá utilizado un parámetro de consulta. Por ejemplo,
 para obtener solo 10 tareas pendientes podríamos haber realizado esta llamada de la API: `GET /api/todos?limit=10`.

La consulta análoga de GraphQL a esta son los *argumentos* que se `puede adjuntar a un «campo».

### Argumento básico: obtener 10 tareas pendientes

Esta consulta de GraphQL buscará 10 tareas pendientes y no todas ellas.

```graphql
query {
  todos(limit: 10) {
    id
    title
  }
}
```

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

La parte más importante para revisar aquí es `limit: 10`. Los servidores de GraphQL proporcionarán una lista de
 argumentos que pueden utilizarse en `()` junto a campos específicos. En nuestro caso, estamos utilizando
 Hasura para crear el backend de GraphQL, el cual proporciona filtros y argumentos de paginación y clasificación.
 La API o el servidor de GraphQL que utilice podría proporcionar un conjunto diferente de los argumentos que pueden utilizarse.

### Varios argumentos en varios campos: obtener 1 usuario y 5 tareas pendientes más recientes para cada usuario

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

Observe que estamos pasando argumentos a diferentes campos. Esta consulta de GraphQL se lee así:
> Buscar usuarios (con límite 1) y sus tareas pendientes (ordenadas por el tiempo de creación en sentido descendente, y con límite 5).

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

<a name="query-variables"></a>

## Variables de GraphQL: pasar argumentos a las consultas de forma dinámica

Esto está muy bien, pero seguimos teniendo un problema. Si queremos crear una consulta
 con la que obtener datos con los argumentos proporcionados de forma dinámica, tendremos que
 volver a crear la cadena de consulta completa.

Esto es lo que no queremos hacer:

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

Afortunadamente, nunca necesitamos hacerlo. Las variables de GraphQL son variables adicionales
 que podemos enviar en una consulta para que los «argumentos» puedan proporcionarse de forma dinámica.

## Obtener el número $limit de tareas pendientes

Este sería el aspecto de la consulta de GraphQL:
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

Ahora, en lugar de enviar solo la consulta al servidor GraphQL, enviaremos
 desde nuestro cliente tanto la consulta como las variables. El servidor GraphQL utilizará la
 variable en el lugar correcto de la consulta automáticamente para nosotros.

Vamos a probarlo en GraphiQL:
1. Diríjase a GraphiQL
2. Escriba esta consulta
3. Desplácese hasta la parte inferior de la página, donde verá un panel más pequeño «Variables de consulta»
4. Agregue la variable de consulta como un objeto JSON

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

## Resumen

- Ahora puede hacer consultas de GraphQL
- Sabe cómo pasar argumentos a las consultas de GraphQL
- Sabe cómo hacer que los argumentos sean dinámicos mediante el uso de variables de consulta

A continuación, vamos a echarle un vistazo a la escritura de datos y no solo a la obtención de los mismos.

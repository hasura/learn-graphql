---
title: Consultas - búsqueda de datos
metaTitle: "Consultas de GraphQL para buscar datos | Tutorial de GraphQL"
metaDescription: "Pruebe las consultas de GraphQL usando GraphiQL. Un ejemplo de consulta de GraphQL con parámetros, argumentos y variables para buscar datos dinámicamente"
---

## Pruebe las consultas de GraphQL {#try-out-graphql-queries}

Para este tutorial hemos configurado una API de GraphQL por usted. La manera más común
de navegar una API de GraphQL es usar GraphiQL. GraphiQL es una herramienta
que construyó Facebook, (se pronuncia «gráfical») que hace que sea fácil de explorar
cualquier API de GraphQL.

¡Cuando conecta GraphiQL a un punto de conexión de GraphQL, hace
una consulta al servidor para el esquema de GraphQL y le da una interfaz de usuario para navegar
y probar las consultas y eso es lo que alimenta su increíble completado automático!

![Demostración de GraphiQL](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/graphiql.gif)

Las herramientas como GraphiQL hacen que sea realmente fácil usar las API de GraphQL  e integrar las API en la aplicación sin requerir herramientas de documentación externa.

Puede acceder a GraphiQL para este tutorial de la aplicación de tareas pendientes en tiempo real aquí: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql)

Cuando trabaja con una API de GraphQL en un proyecto, casi siempre utilizará una herramienta como GraphiQL para explorar y probar las consultas de GraphQL.

## Consulta básica de GraphQL {#basic-graphql-query}

1. Abra GraphiQL en: [hasura.io/learn/graphql/graphiql](https://hasura.io/learn/graphql/graphiql). Tendrá que iniciar sesión para obtener un token de autorización para consultar la API. En un escenario del mundo real, las API de GraphQL estarán protegidas.
2. Verá una URL y encabezados que contienen el token de autorización que se enviará junto con la consulta de GraphQL.
3. Ahora, pegue esta consulta de GraphQL en la ventana de GraphiQL

```graphql
 query {
   users {
     name
   }
 }
```

4. Pulse `ctrl + enter` o `cmd + enter` (mac) o haga clic en el icono ▶️ para ejecutar la consulta de GraphQL
5. ¡A la derecha, debe ver una lista de usuarios por sus nombres que están en el sistema!

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

¡Recuerde que aquí no hay magia! La aplicación de GraphiQL alojada está enviando una cadena de consulta de GraphQL al servidor en el punto de conexión dado con los encabezados de HTTP. Entonces el servidor envía la respuesta que ve en el lado derecho.

## Búsqueda de «gráficos» {#fetching-graphs}

Nuestra aplicación de tareas pendientes tiene usuarios, tareas pendientes e información sobre los usuarios que están actualmente en línea. Así se ve nuestro «esquema» de la API:

![Esquema](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-react/schema.png)

Como puede ver, es un esquema como un «gráfico» en el que los 3 modelos están vinculados entre sí.

Intentemos hacer consultas que buscan diferentes porciones de los datos del «gráfico» general.

### Busque usuarios y sus tareas pendientes {#fetch-users-and-their-todos}

Esta consulta de GraphQL buscará a todos los usuarios y sus tareas pendientes de acceso público:

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


### Busque usuarios en línea y la información del perfil {#fetch-online-users}

Esta consulta de GraphQL buscará a todos los usuarios que actualmente estén en línea y la información del perfil (que es solo su nombre, por ahora):

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


## Adición de parámetros (argumentos) a las consultas de GraphQL {#adding-parameters}

En la mayoría de las llamadas de API, generalmente utiliza parámetros, por ejemplo, para especificar qué datos está buscando. Si está familiarizado con hacer llamadas `GET`, habrá utilizado un parámetro de consulta. Por ejemplo, para buscar solo 10 tareas pendientes, puede que haya hecho esta llamada de API: `GET /api/todos?limit=10`.

La analogía de la consulta de GraphQL con esto son los *argumentos* que puede conectar a un «campo».

### Argumento básico: busque 10 tareas pendientes {#basic-argument}

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

La parte más importante para revisar aquí es `limit: 10`. Los servidores de GraphQL proporcionarán una lista de argumentos que se pueden utilizar en `()` junto a campos específicos. En nuestro caso, estamos utilizando Hasura para crear el backend de GraphQL que proporciona argumentos de paginación, orden y filtración. La API o el servidor de GraphQL que utiliza podría proporcionar un conjunto diferente de argumentos que se pueden usar.

### Varios argumentos en varios campos: busque 1 usuario y 5 tareas pendientes más recientes para cada usuario {#multiple-arguments}

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

Observe que estamos pasando argumentos a diferentes campos. Esta consulta de GraphQL se lee como:
> Buscar usuarios (con límite 1) y sus tareas pendientes (ordenadas por el tiempo de creación en sentido descendente, y con límite 5).

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

## Variables de GraphQL: pasar argumentos a las consultas de forma dinámica {#graphql-variables}

Esto es genial, pero todavía tenemos un problema. Si queremos crear una consulta en la que estamos buscando datos con argumentos que se proporcionan de forma dinámica, tendríamos que crear toda la cadena de consulta de nuevo.

Esto es lo que no queremos hacer:

```javascript
var limit = getMaxTodosFromUserInput();
var query = "query { todos (limit: " + limit.toString() + ") {id title} }";
```

¡Afortunadamente, no necesitamos hacer esto nunca! ¡Las variables de GraphQL son variables adicionales que puede enviar en una consulta para que los «argumentos» se puedan proporcionar de forma dinámica!

## Busque el número de $limit de  las tareas pendientes {#fetch-limit}

Así sería la consulta de GraphQL:
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

Ahora, en lugar de enviar solo la consulta al servidor de GraphQL desde el cliente, enviaremos la consulta y las variables. ¡El servidor de GraphQL usará la variable
 en el lugar correcto en la consulta de forma automática!

Intentemos esto en GraphiQL:
1. Diríjase a GraphiQL
2. Escriba esta consulta
3. Desplácese hasta la parte inferior de la página, donde verá un panel más pequeño «Variables de consulta»
4. Agregue la variable de consulta como un objeto JSON

<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

## Resumen {#summary}

- Ahora puede hacer consultas de GraphQL
- Sabe cómo pasar argumentos a las consultas de GraphQL
- Sabe cómo hacer que los argumentos sean dinámicos mediante el uso de variables de consulta

¡A continuación, vamos a mirar la escritura de datos y no solo la búsqueda de datos!

---
title: Escritura de datos - Mutaciones
metaTitle: "Mutaciones de GraphQL para insertar datos | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Pruebe la mutación de GraphQL utilizando GraphiQL. Un ejemplo de mutación de GraphQL con argumentos dinámicos y variables para insertar datos"
canonicalUrl: "https://hasura.io/learn/graphql/intro-graphql/graphql-mutations/"
---

import {Link} from "gatsby";

Estos son los conceptos que debe conocer antes de abordar las mutaciones (ja, ja, ja):
- <Link to="/intro-to-graphql/2-fetching-data-queries/#tryoutgraphqlqueries">Uso de GraphiQL</Link>
- <Link to="/intro-to-graphql/2-fetching-data-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">Uso de variables de consulta</Link>

Ahora, vamos a comenzar con cómo podemos utilizar GraphQL para «escribir» datos.
Las mutaciones de GraphQL son tipos de consultas de GraphQL que pueden resultar
 de la «mutación» o cambios de su backend, al igual las API `'POST'`,
`'PUT'` , `'PATCH'`, `'DELETE'` típicas.

## Mutaciones básicas
Dado que estamos utilizando Hasura para nuestra API de GraphQL, obtendremos las mutaciones para
 inserciones, actualizaciones o eliminaciones que podamos utilizar en nuestra aplicación.

Vamos a probar esas mutaciones en el contexto de una aplicación de tareas pendientes para ver
 qué aspecto tienen las mutaciones. Las mutaciones obtenidas de otro servicio
 GraphQL, supongamos que el equipo de su API ha creado el suyo propio, podrían ser distintas.

### Crear una tarea pendiente

Hagamos una llamada de API para crear una tarea pendiente. Como habrá podido adivinar, esto
 será una parte fundamental de nuestra app de tareas pendientes. 😉

> **Consejo**: ahora supongamos que no conocemos el nombre de la mutación para
>  crear una tarea pendiente. ¡GraphiQL al rescate! Diríjase a GraphiQL y, a la derecha, haga clic en la pestaña «docs». Escriba «todo» allí y verá una lista de tipos y consultas de GraphQL
>  que utilizan tareas pendientes. Lea las descripciones y pronto verá
>  que `insert_todos` es lo que necesita.

La mutación para crear tareas pendientes se titula `insert_todos`.

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

## Devolución de datos tras la mutación
Observe que los datos de la tarea que va a insertarse se envían como
 argumento para la mutación `insert_todos`. Pero los «campos» de la mutación
 especifican la forma de la _respuesta_ que queremos del servidor.

Digamos que nos gustaría obtener el objeto de tarea pendiente completo, una vez se haya creado
 como respuesta:

```graphql
mutation {
  insert_todos(objects: [{title: "new todo"}]) {
    returning {
      id
      title
      is_completed
      is_public
      created_at
    }
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

## Parametrizar lo que se inserta

Para mutaciones, casi siempre tendríamos que parametrizar los argumentos. Nosotros, raramente, si acaso, tenemos mutaciones «codificadas» en nuestra aplicación. Esto se debe a que
 los argumentos acerca de qué datos capturar, cómo modificar o eliminar algo suelen, a menudo,
 depender de alguna acción del usuario.

Ahora que ya sabemos cómo parametrizar utilizando variables de consulta, utilicémoslo:

```graphql
# The parameterised GraphQL mutation
mutation($todo: todos_insert_input!){
  insert_todos(objects: [$todo]) {
    returning {
      id
    }
  }
}
```

```javascript
# As a query variable
{
  "todo": {
    "title": "A new dynamic todo"
  }
}
```

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

Un poco más tarde, exploraremos más mutaciones para actualizar o eliminar datos. Este es un buen comienzo para comprender las mutaciones.

## Resumen

- Puede hacer mutaciones básicas de GraphQL
- Puede pasar datos/argumentos dinámicos a mutaciones con variables de consulta

A continuación, veamos las suscripciones de GraphQL

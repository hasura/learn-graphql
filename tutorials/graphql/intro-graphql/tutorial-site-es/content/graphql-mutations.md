---
title: Mutaciones - escritura de datos
metaTitle: "Mutaciones de GraphQL para insertar datos | Tutorial de GraphQL"
metaDescription: "Pruebe la mutación de GraphQL utilizando GraphiQL. Un ejemplo de mutación de GraphQL con argumentos dinámicos y variables para insertar datos"
---

import {Link} from "gatsby";

Estos son los conceptos que debe saber antes de atacar las mutaciones (ja, ja, ja):
- <Link to="/graphql-queries/#graphiql">Uso de GraphiQL</Link>
- <Link to="/graphql-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">Uso de variables de consulta</Link>

Ahora, empecemos a ver cómo podemos utilizar GraphQL para «escribir» datos. Las mutaciones de GraphQL son tipos de consultas de GraphQL que pueden provocar que estado del backend «mute» o cambe, al igual que las típicas API `'POST'`, `'PUT'`, `'PATCH'` y `'DELETE'`.

## Mutaciones básicas {#basic-mutations}
Como estamos utilizando Hasura para nuestra API de GraphQL, obtenemos mutaciones para inserciones, actualizaciones o eliminaciones que podemos utilizar en la aplicación.

Probemos estas mutaciones en el contexto de una aplicación de tareas pendientes para ver cómo se ven las mutaciones. En las mutaciones que obtiene de otro servicio de GraphQL, se establece si el equipo de API ha construido el suyo propio, podría ser diferente.

### Cree una tarea pendiente {#create-a-todo}

Hagamos una llamada de API para crear una tarea pendiente. Como habría adivinado, esta será una parte crítica de nuestra aplicación de tareas pendientes. 😉

> **Consejo**: ahora digamos que no sabemos el nombre de la mutación para crear una tarea pendiente. ¡GraphiQL al rescate! Diríjase a GraphiQL y a la derecha, haga clic en la pestaña «docs». Escriba «todo» allí y verá una lista de tipos y consultas de GraphQL que utilizan tareas pendientes. Revise las descripciones y pronto encontrará que `insert_todos` es lo que necesita.

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

## Devolución de datos después de la mutación {#returning-data-after-the-mutation}
Observe que los datos de la tarea pendiente que se debe insertar se envían como un argumento a la `insert_todos`mutación. Pero los «campos» de la mutación especifican la forma de la _respuesta_ que busca del servidor.

Digamos que nos gustaría obtener el objeto de tarea pendiente completo una vez que se haya creado como una respuesta:

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

## Parametrizar lo que inserta {#parameterise-what-you-insert}

¡Para mutaciones, casi siempre tendríamos que parametrizar los argumentos! Rara vez, si no es nunca, tendríamos una mutación «codificada» en nuestra aplicación. Esto se debe a que los argumentos de qué datos capturar, cómo modificar o eliminar algo suelen depender de alguna acción del usuario.

Ahora que sabemos cómo parametrizar utilizando variables de consulta, utilicémoslo:

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

Aquí, `todos_insert_input` es el tipo de la variable `$todo` y `!` se utiliza para denotar que es una entrada obligatoria.

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébelo en GraphiQL</a></b>

Un poco más tarde, exploraremos más mutaciones para actualizar o eliminar datos. ¡Este es un buen comienzo para comprender las mutaciones!

## Resumen {#summary}

- Puede hacer mutaciones básicas de GraphQL
- Puede pasar datos/argumentos dinámicos a mutaciones con variables de consulta

A continuación, veamos las suscripciones de GraphQL

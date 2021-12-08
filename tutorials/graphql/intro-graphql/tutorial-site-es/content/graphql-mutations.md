---
title: Mutaciones - Escritura de datos
metaTitle: "Mutaciones de GraphQL para insertar datos | Tutorial de GraphQL"
metaDescription: "Pruebe GraphQL Mutation usando GraphiQL. Ejemplo de mutación GraphQL con argumentos dinámicos y variables para insertar datos"
---

import {Link} from "gatsby";

Estos son los conceptos que debes saber antes de atacar mutaciones (haha):
- <Link to="/graphql-queries/#graphiql">Usando GraphiQL</Link>
- <Link to="/graphql-queries/#graphqlvariables:passingargumentstoyourqueriesdynamically">Uso de variables de consulta</Link>

Ahora, comencemos con ver cómo podemos usar GraphQL para "escribir" datos. Las mutaciones de GraphQL son tipos de consultas de GraphQL que pueden resultar en el estado de su backend "mutando" o cambiando, al igual que `'POST'`típico,`'PUT'` `'PATCH'`, `'DELETE'`API.

## Mutaciones básicas
Ya que usamos Hasura para nuestra API GraphQL, obtenemos mutaciones para inserts, actualizaciones o eliminaciones que podemos utilizar en nuestra aplicación.

Vamos a probar estas mutaciones en el contexto de una aplicación todo para ver cómo se ven las mutaciones. Mutaciones que obtienes de otro GraphQL servicio, diga si su equipo de API ha construido su propio, podría ser diferente.

### Crear un todo

Hagamos una llamada a la API para crear un todo. Como habrías adivinado, esto será una parte crítica de nuestra aplicación de todo. 😉

> **Protip**: Ahora digamos que no sabemos el nombre de la mutación a crear un todo. ¡GraphiQL al rescate! Dirígete a GraphiQL y a la derecha, haz clic en la pestaña "docs". Escribe "todo" allí y verás una lista de consultas y tipos de GraphQL que usan todo. Lea sus descripciones y pronto lo harás encontrar eso `insert_todos`es lo que necesitas.

La mutación para crear todos se titula `insert_todos`.

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
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

## Devolver datos después de la mutación
Observe que los datos de todo que se va a insertar se envían como un argumento a la `insert_todos`mutación. Pero los "campos" de la mutación especifique la forma de la _respuesta_ que desea desde el servidor.

Digamos que nos gustaría conseguir todo el objeto una vez que se haya creado como respuesta:

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
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

## Parameterise lo que inserta

¡Para las mutaciones, casi siempre tendríamos que parametrizar los argumentos! Nosotros rara vez, si alguna vez, tener una mutación "codificada" en nuestra aplicación. Esto es porque los argumentos de qué datos capturar, cómo modificar o eliminar algo es generalmente dependiente de alguna acción de usuario.

Ahora que sabemos cómo parametrizarse usando variables de consulta, vamos a usar eso:

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

`$todo`Aquí `todos_insert_input`el tipo de variable es el que se `!`utiliza para denotar que es una entrada obligatoria.

<!-- [//]: # TODO: -->
<b><a href="https://hasura.io/learn/graphql/graphiql" target="_blank">Pruébalo en GraphiQL</a></b>

Exploraremos más mutaciones para actualizar o eliminar datos un poco más tarde. ¡Este es un buen comienzo para hacer las mutaciones!

## Resumen

- Puede hacer mutaciones básicas de GraphQL
- Puede pasar argumentos/datos dinámicos a mutaciones con variables de consulta

A continuación, veamos las suscripciones de GraphQL

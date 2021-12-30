---
title: "Conceptos principales de GraphQL"
metaTitle: "Conceptos principales de GraphQL | Tutorial de GraphQL"
metaDescription: "Conozca los conceptos principales de GraphQL: documento, operación, campos, argumentos, variables, alias, fragmentos y directivas"
---

GraphQL presenta un nuevo conjunto de conceptos para alguien que viene de un trasfondo de API de REST. En esta sección, vamos a examinar los conceptos principales de GraphQL desde una perspectiva de cliente/frontend.

## Documento de GraphQL {#graphql-document}
El contenido de una cadena de solicitud de GraphQL se llama documento de GraphQL. Este es un ejemplo de un documento:

```graphql
{
  author {
    id
    name
  }
}
```

La cadena sigue una sintaxis como la anterior que un cliente o servidor de GraphQL puede analizar y validar. La sintaxis anterior utiliza una anotación abreviada para una operación de consulta.

## Operación de GraphQL {#graphql-operation}
Una operación de GraphQL puede ser de tipo

- consulta (una búsqueda de solo lectura)
- mutación (una escritura seguida de una búsqueda)
- suscripción (una solicitud de larga duración que busca datos en respuesta a eventos de origen).

Un documento de GraphQL puede contener una o más de estas operaciones (es decir, varias consultas/mutaciones/suscripciones).

Veamos un ejemplo de un documento de GraphQL con una operación:

```graphql
query {
  author {
    id
    name
  }
}
```

En este ejemplo, un documento contiene una operación de consulta. La operación de GraphQL selecciona el conjunto de información que necesita, que se menciona como el conjunto de selección. En el ejemplo anterior, la operación de consulta selecciona la información sobre `author` y `id` y `name`.

Ahora, vamos a examinar la anatomía del documento en detalle.

## Anatomía de un documento de GraphQL {#anatomy-of-a-graphql-document}

Ahora, tomemos el siguiente ejemplo:

```graphql
query {
  author(limit: 5) {
    id
    name
  }
}
```

Se habrá dado cuenta de que este es otro documento de GraphQL con operación de consulta.

¿De qué se compone el resto del documento? Veamos.

#### Campos {#fields}

Un campo de GraphQL describe un elemento discreto de información. Esta información podría ser simple o compleja con relaciones entre datos.

En el documento anterior, todo lo incluido dentro de la operación es de campos (autor, ID y nombre).

```
author {
  id
  name
}
```

Puede haber información compleja con relaciones como la que se muestra a continuación:

```graphql
query {
  author(limit: 5) {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

Aquí, además de los campos de autor, también tenemos campos de artículos que le permiten representar relaciones entre campos.

#### Argumentos {#arguments}

Imagine campos como funciones que devuelven valores. Ahora asumamos que la función también acepta argumentos que se comportan de manera diferente.

En el ejemplo anterior,

```
author(limit: 5)
```

El campo autor acepta un argumento `limit` para limitar el número de resultados que se devuelven. Estos argumentos pueden ser opcionales u obligatorios y pueden aparecer en cualquier campo del documento.

#### Variables {#variables}

Las consultas de GraphQL se pueden parametrizar con variables para reutilizar y para construir fácilmente consultas del lado del cliente.

En el ejemplo anterior, suponga que el parámetro de límite es configurable por el usuario que ve la página, entonces sería más fácil pasar una variable al argumento de campo.

```
query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
```

Las variables se definen en la parte superior de la operación y el cliente puede enviar el valor de la variable en un formato que el servidor entienda. Normalmente las variables se representan en JSON como a continuación

```
{
  limit: 5
}
```

#### Nombre de la operación {#operation-name}

Cuando el documento contiene varias operaciones, el servidor tiene que saber cuáles ejecutar y asignar los resultados en el mismo orden. Por ejemplo:

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic
  }
}
query fetchAuthors {
  author(limit: 5, order_by: { name: asc }) {
    id
    name
    profile_pic
  }
}
```

Esto tiene dos operaciones: una para buscar un solo autor y otra para buscar varios autores.

Estos son los más comunes que se utilizan normalmente en una solicitud simple de GraphQL.

Aquí hay algunos otros conceptos utilizados por aplicaciones más complejas.

#### Alias {#aliases}

Considere el siguiente ejemplo:

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic_large: profile_pic(size: "large")
    profile_pic_small: profile_pic(size: "small")
  }
}
```

Cuando está buscando información sobre un autor, digamos que tiene dos imágenes de diferente tamaño y tiene un campo con un argumento para hacerlo. En este caso, no puede utilizar el mismo campo dos veces bajo el mismo conjunto de selección y por lo tanto, un `Alias` sería útil para distinguir los dos campos.

#### Fragmentos {#fragments}

Los fragmentos hacen que GraphQL sea aún más reutilizable. Si hay algunas partes del documento que reutiliza el mismo conjunto de campos de un determinado tipo, entonces el fragmento puede ser potente.

Por ejemplo:

```graphql
fragment authorFields on author {
  id
  name
  profile_pic
  created_at
}

query fetchAuthor {
  author(id: 1) {
    ...authorFields
  }
}

query fetchAuthors {
  author(limit: 5) {
    ...authorFields
  }
}
```

Observe el uso de fragmento aquí: `...authorFields`. Este tipo de uso se llama fragmento de propagación. También hay fragmentos en línea donde no declara explícitamente el fragmento por separado, pero lo usa en línea en una consulta.

#### Directivas {#directives}

Las directivas son identificadores que añaden funcionalidad adicional sin afectar el valor de la respuesta, pero pueden afectar la respuesta que vuelve al cliente.

Una lista de argumentos nombrados pueden seguir opcionalmente al identificador `@`.

Las siguientes son algunas directivas de servidor predeterminadas compatibles con GraphQL:

- @deprecated (razón: cadena), marca el campo como en desuso
- @skip (si: booleano), se salta la ejecución de GraphQL para este campo
- @include (si: booleano), llama a la resolución para un campo anotado, si es verdadero.

Por ejemplo:

```graphql
query ($showFullname: Boolean!) {
  author {
    id
    name
    fullname @include(if: $showFullname)
  }
}
```

En la consulta anterior, incluimos el nombre completo del campo, solo si la condición es verdadera (la condición puede tener su propia lógica dependiendo de la aplicación).

También puede utilizar directivas personalizadas para manejar otros casos de uso.

En las aventuras que correrá en GraphQL, seguramente se encontrará con estos conceptos principales. ¡Ahora está equipado para trabajar con ellos!

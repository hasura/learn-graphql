---
title: "Conceptos de núcleo de GraphQL"
metaTitle: "Conceptos básicos de Graph Tutorial de gráficos de QL"
metaDescription: "Aprenda sobre los conceptos básicos de GraphQL - documentos, operaciones, campos, argumentos, variables, alias, fragmentos y directivas"
---

GraphQL introduce un nuevo conjunto de conceptos para alguien que viene de un fondo de REST API. En esta sección, veremos los conceptos básicos de GraphQL desde una perspectiva cliente/frontend.

## Documento GraphQL
El contenido de una cadena de solicitud de GraphQL se llama documento GraphQL. Este es un ejemplo de un documento:

```graphql
{
  author {
    id
    name
  }
}
```

La cadena sigue una sintaxis como la anterior que un servidor o cliente GraphQL puede analizar y validar. La sintaxis anterior utiliza una notación de abreviatura para una operación de consulta.

## Operación GraphQL
Una operación GraphQL puede ser de tipo

- consulta (un simple descubrimiento)
- mutación (una escritura seguida por la receta)
- suscripción (una solicitud de larga duración que obtiene datos en respuesta a eventos de origen).

Un documento GraphQL puede contener una o más de estas operaciones (es decir, múltiples consultas/mutaciones/suscripciones).

Veamos un ejemplo de un documento GraphQL con una operación:

```graphql
query {
  author {
    id
    name
  }
}
```

En este ejemplo, un documento contiene una operación de consulta. La operación GraphQL selecciona el conjunto de información que necesita, denominada conjunto de selección. En el ejemplo anterior, la operación de consulta selecciona información sobre la `author`y su `id`y .`name`

Vamos a examinar en detalle la anatomía del documento ahora.

## Anatomía de un documento GraphQL

Vamos a tomar el siguiente ejemplo ahora:

```graphql
query {
  author(limit: 5) {
    id
    name
  }
}
```

Se habría dado cuenta de que este es otro documento GraphQL con la operación de consulta.

¿De qué consiste el resto del documento? Veamos.

#### Campos

Un campo GraphQL describe una información discreta. Esta información puede ser simple o compleja con relaciones entre datos.

En el documento anterior, todo lo que se adjunta dentro de la operación es campos (autor, id, y nombre).

```
author {
  id
  name
}
```

Puede haber información compleja con relaciones como la siguiente:

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

#### Argumentos

Imagina campos como funciones que devuelven valores. Ahora asumamos que la función también acepta argumentos que se comportan de manera diferente.

En el ejemplo anterior,

```
author(limit: 5)
```

El campo de autor acepta un argumento `limit`para limitar el número de resultados devueltos. Estos argumentos pueden ser opcionales o obligatorios y pueden aparecer en cualquier campo del documento.

#### Variables

Las consultas GraphQL pueden ser parametrizadas con variables para la reutilización y la construcción fácil de las consultas en el lado del cliente.

En el ejemplo anterior, suponga que el parámetro límite es configurable por el usuario que ve la página, entonces sería más fácil pasar una variable al argumento de campo.

```
query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
```

La variable (s) se define en la parte superior de la operación y el valor de la variable puede ser enviado por el cliente en un formato que el servidor entiende. Normalmente las variables se representan en JSON como a continuación

```
{
  limit: 5
}
```

#### Nombre de la operación

Cuando el documento contiene varias operaciones, el servidor debe saber cuáles deben ejecutar y asignar los resultados en el mismo orden. Por ejemplo:

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

Estos son los más comunes que se utilizan en una simple solicitud de GraphQL.

Aquí hay algunos otros conceptos utilizados por aplicaciones más complejas.

#### Alias

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

Cuando usted está buscando información sobre un autor, digamos que tiene dos imágenes, diferentes tamaños y tiene un campo con un argumento para hacerlo. `Alias`En este caso, no puede utilizar el mismo campo dos veces bajo el mismo conjunto de selección y por lo tanto sería útil distinguir los dos campos.

#### Fragmentos

Los fragmentos hacen que GraphQL sea aún más reutilizable. Si hay algunas partes de su documento que reutiliza el mismo conjunto de campos en un tipo dado, entonces el fragmento puede ser poderoso.

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

Observe el uso del fragmento aquí - `...authorFields`. Este tipo de uso se llama fragmento de propagación. También hay fragmentos en línea donde no declara explícitamente fragmento por separado, pero lo usa en línea en una consulta.

#### Directivas

Las directivas son identificadores que añaden funcionalidad adicional sin afectar el valor de la respuesta, pero pueden afectar a qué respuesta regresa al cliente.

El identificador `@`es seguido opcionalmente por una lista de argumentos nombrados.

Algunas directivas de servidor predeterminadas soportadas por GraphQL spec son:

- @deprecated(reason: String) - marca el campo como despreciado
- @skip (if: Boolean) - Salta la ejecución de GraphQL para este campo
- @include (if: Boolean) - Llama a resolver para un campo anotado, si es verdad.

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

También puede usar directivas personalizadas para manejar otros casos de uso.

En tus aventuras de GraphQL, seguramente te encontrarás con estos conceptos principales. ¡Ahora estás preparado para trabajar con ellos!

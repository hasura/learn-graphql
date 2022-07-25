---
title: "Introspección de GraphQL"
metaTitle: "Introspección de GraphQL | Tutorial de GraphQL"
metaDescription: "Aprenda qué es la introspección de GraphQL y cómo ayuda a hacer las herramientas en la comunidad, como GraphiQL."
---

Una característica clave de GraphQL que da una gran cantidad de beneficios en REST es la introspección. El lenguaje de consulta de GraphQL está fuertemente tipado. Este sistema de tipo fuerte da la capacidad de consultar y comprender el esquema subyacente.

El esquema actúa como el contrato entre los equipos de frontend y de backend. Pero ¿cómo sabe el desarrollador de frontend cómo es el esquema de backend? ¿Cómo evitan la búsqueda excesiva o búsqueda insuficiente? Esto es posible debido a las consultas de introspección.

## Consultas de introspección {#introspection-queries}

Un servidor de GraphQL es compatible con la introspección sobre su esquema utilizando el mismo lenguaje de consulta de GraphQL.

Un servidor expone las siguientes consultas de introspección en el tipo de operación `Query`.

- `__schema`
- `__type`
- `__typename`

Tenga en cuenta que las consultas de introspección comienzan con `__`.

## Herramientas de la comunidad {#community-tooling}

La capacidad de introspección es lo que permite a la comunidad construir herramientas impresionantes en torno a GraphQL. Existen [GraphiQL](https://github.com/graphql/graphiql) y [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) que aprovechan la característica de introspección para proporcionar autodocumentación a los desarrolladores y probar las API de forma rápida.

Las herramientas anteriores utilizan la consulta de introspección `__schema` para dar la documentación del esquema. Puede explorar más si prueba la consulta `__schema` para ver los diferentes campos, directivas y conjuntos de selección.

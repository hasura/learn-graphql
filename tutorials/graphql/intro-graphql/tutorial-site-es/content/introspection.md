---
title: "Introspección GraphQL"
metaTitle: "Tutorial de introducción de Graph de GraphQL"
metaDescription: "Aprenda sobre qué es la introducción de GraphQL y cómo ayuda a hacer las herramientas alrededor de la comunidad como GraphiQL."
---

Una característica clave de GraphQL que da muchos beneficios sobre REST es Introspection. El lenguaje de consulta GraphQL está fuertemente escrito. Este sistema de tipo fuerte le da la capacidad de consultar y entender el esquema subyacente.

El esquema actúa como el contrato entre los equipos de frontend y backend. Pero, ¿cómo sabe el desarrollador de frontend cómo es el esquema de backend? ¿Cómo evitan la sobre-extracción o la sobre-extracción de la misma? Esto es posible debido a las consultas de Introspection.

## Consultas de Introspección

Un servidor GraphQL admite la introspección sobre su esquema utilizando el mismo lenguaje de consulta GraphQL.

Un servidor expone las siguientes consultas de introspección en el tipo de `Query`operación.

- `__schema`
- `__type`
- `__typename`

Tenga en cuenta que las consultas de introspección comienzan con `__`.

## Herramientas de la comunidad

La capacidad de introspect es lo que permite a la comunidad construir herramientas impresionantes alrededor de GraphQL. Hay [GraphiQL](https://github.com/graphql/graphiql) y [GraphQL Playground](https://github.com/prisma-labs/graphql-playground) que aprovecha la función Introspection para proporcionar documentación propia a los desarrolladores y probar API rápidamente.

Las herramientas anteriores utilizan la consulta de `__schema`introspección para dar la documentación del esquema. Puede explorar más probando la `__schema`consulta para ver los diferentes conjuntos de selección, campos y directivas.

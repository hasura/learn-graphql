---
title: "Modelado de datos"
metaTitle: "Modelado de datos con Tut Tutorial de Hasura"
metaDescription: "Este tutorial cubre cómo hacer modelado de datos en Postgres y crear tablas utilizando la consola Hasura"
---

En esta parte del curso, construiremos el modelo de datos para una aplicación todo en tiempo real. Nuestra aplicación todo tendrá las siguientes características:

- Los usuarios pueden mantener todos personales
- Los usuarios pueden ver todos públicos
- Una lista de usuarios en línea que utilizan la aplicación
- Enviar correo electrónico cuando un usuario se registra

En general, esto significa que tenemos dos modelos principales en esta aplicación: `users`y , cada `todos`uno con su propio conjunto de propiedades.

Vamos a repasar ellos en los pasos posteriores.

El modelo final se parece a lo siguiente:

![Aplicación de Schema Todo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

A medida que [creamos tablas utilizando la consola o directamente en postgres](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/), el motor Hasura GraphQL crea automáticamente tipos de objeto de esquema GraphQL y campos de consulta / mutación correspondientes con resolvers.

---
title: "Modelado de datos"
metaTitle: "Modelado de datos con Hasura | Tutorial de GraphQL de Hasura"
metaDescription: "En este tutorial se cubre cómo hacer el modelado de datos en Postgres y crear tablas utilizando la consola de Hasura"
---

En esta parte del curso, construiremos el modelo de datos para una aplicación de tareas pendientes en tiempo real. Nuestra aplicación de tareas pendientes tendrá las siguientes características:

- Los usuarios pueden mantener las tareas pendientes personales
- Los usuarios pueden ver las tareas pendientes públicas
- Una lista de usuarios en línea actualmente utilizando la aplicación
- Envío de un correo electrónico cuando un usuario se registre

En general, esto significa que tenemos dos modelos principales en esta aplicación: `users` y `todos`, cada uno con su propio conjunto de propiedades.

Los analizaremos en los pasos siguientes.

El modelo final se parece al siguiente:

![Aplicación de esquema de tareas pendientes](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/voyager-schema.png)

A medida que [creamos tablas utilizando la consola o directamente en los postgres](https://hasura.io/learn/database/postgresql/create-alter-drop-ddl/1-postgresql-create/), el motor de GraphQL de Hasura crea automáticamente los tipos de objetos del esquema de GraphQL y los campos de mutación/consulta correspondientes con las resoluciones.

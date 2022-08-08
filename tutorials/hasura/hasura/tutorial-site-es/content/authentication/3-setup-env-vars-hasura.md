---
title: "Conexión de Hasura con Auth0"
metaTitle: "Conexión de Hasura con Auth0 | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, aprenderá a conectar Hasura con la aplicación Auth0 y a proteger la aplicación con HASURA_GRAPHQL_JWT_SECRET"
---

En esta parte, aprenderá a conectar Hasura con la aplicación de Auth0 que acaba de crear en el paso anterior.

Antes de hacer eso, necesitamos proteger nuestro punto de conexión con un secreto de administrador. Ahora mismo, el punto de conexión de GraphQL está abierto y cualquiera puede consultar y gestionar los datos. [Lea los documentos](https://hasura.io/docs/latest/graphql/cloud/projects/secure/#adding-an-admin-secret)) sobre cómo agregar un secreto de administrador a un proyecto de Hasura Cloud.

Una vez que se agrega un secreto de administrador, necesitamos configurar Hasura para utilizar las claves públicas de Auth0. Una manera más fácil de generar la configuración para JWT es utilizar el siguiente enlace: [https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)

![jwt-config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/generate-jwt-config.png)

La configuración generada puede utilizarse como el valor para la variable de entorno `HASURA_GRAPHQL_JWT_SECRET`.

Abra el panel de Hasura Cloud y diríjase a la página «Env vars» para su proyecto de Hasura Cloud:

![Hasura ENV Config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

Haga clic en `+ New Env Var` para agregar una nueva variable de entorno.

Agregue una nueva Config Var llamada `HASURA_GRAPHQL_JWT_SECRET` y copie y pegue la configuración JWT generada en el cuadro de valor.

Debería terminar con algo como lo siguiente:

![Agregue la nueva nube de env](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-env-cloud.png)

Haga clic en `Add` y la variable de entorno se aplicará al proyecto.

¡Genial! Ahora, la instancia de Hasura está protegida utilizando Auth0.

---
title: "Conecta Hasura con Auth0"
metaTitle: "Conecte el tutorial de Hasura with  Hasura con el tutorial"
metaDescription: "En esta parte, aprenderás a conectar Hasura con la aplicación Auth0 y a proteger tu aplicación con HASURA_GRAPHQL_JWT_SECRET"
---

En esta parte, aprenderás a conectar Hasura con la aplicación Auth0 que acabas de crear en el paso anterior.

Antes de que hagamos eso, necesitamos asegurar nuestro punto final con un secreto de administración. En este momento, el punto final GraphQL está abierto y cualquiera puede consultar y administrar los datos. [Lea los documentos](https://hasura.io/docs/latest/graphql/cloud/projects/secure.html#adding-an-admin-secret) sobre cómo agregar un secreto de administración a un proyecto de Hasura Cloud.

Una vez que se añade un secreto de administración, necesitamos configurar Hasura para usar las claves públicas Auth0. Una forma más fácil de generar la configuración para JWT es usar el siguiente enlace - [https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)

![jwt-config](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/generate-jwt-config.png)

La configuración generada puede ser utilizada como valor para la variable de entorno `HASURA_GRAPHQL_JWT_SECRET`.

Abra el panel de Hasura Cloud y diríjase a la página "Env vars" para su proyecto de Hasura Cloud:

![Hasura ENV Config.](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-project-env-var.png)

Haga clic en `+ New Env Var`para agregar una nueva variable de entorno.

Agregue un nuevo `HASURA_GRAPHQL_JWT_SECRET`Config, llamado , y copie y pegue la configuración generada JWT en el cuadro de valor.

Usted debe terminar con algo como lo siguiente:

![Añadir nuevo env Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/add-env-cloud.png)

Haga clic en `Add`y su variable de entorno se aplicará al proyecto.

¡Genial! Ahora tu instancia de Hasura está segura con Auth0.

---
title: "Creación de la aplicación Auth0"
metaTitle: "Creación de la aplicación Auth0 | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, aprenderemos a crear una aplicación Auth0 utilizando el panel de control para una aplicación web de una sola página."
---

1. Desplácese hasta el [panel de Auth0](https://manage.auth0.com/)
2. Regístrese/inicie sesión en la cuenta
3. Cree un nuevo inquilino.
4. Haga clic en la opción del menú `Applications` a la izquierda y luego haga clic en el botón `+ Create Application`.
5. En la ventana Create Application, establezca un nombre para la aplicación y seleccione `Single Page Web Applications`. (Suponiendo que la aplicación de frontend será un SPA que se construya en react/vue, etc.)

![Creación de la aplicación Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

## Cree la API de Auth0 {#create-auth0-api}

Necesitamos crear una API en Auth0 para que podamos hacer que `accessToken` sea un JWT válido. Haga clic en la sección `APIs`, en la barra lateral izquierda, y luego haga clic en el botón `+ Create API`.

![Cree la API de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

Ahora en la ventana emergente que aparece, escriba el nombre de la API y el identificador. Técnicamente, podemos dar cualquier valor.

Digamos que el nombre es `hasura` y el identificador es `https://hasura.io/learn`.

![API de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

Podemos dejar que el algoritmo de firma como está. (RS256)

Haga clic en Create una vez que haya terminado.

---
title: "Crear aplicación Auth0"
metaTitle: "Crear aplicación de Auth de Hasura"
metaDescription: "En esta parte, aprenderemos cómo crear una aplicación Auth0 usando el panel de control para una aplicación Web de una sola página."
---

1. Navegue al [panel de control de Auth0](https://manage.auth0.com/)
2. Iniciar sesión en la cuenta
3. Crea un nuevo inquilino.
4. Haga clic en la opción de `Applications`menú de la izquierda y luego haga clic en el `+ Create Application`botón.
5. En la ventana Crear aplicación, establezca un nombre para su aplicación y seleccione `Single Page Web Applications`. (Suponiendo que la aplicación frontend será un SPA construido sobre react/vue etc.)

![Crear aplicación Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-auth0-app.png)

## Crear API de Auth0

`accessToken`Necesitamos crear una API en Auth0 para que podamos hacer que el JWT sea válido. Haga clic en la `APIs`sección de la barra lateral izquierda y haga clic en el `+ Create API`botón.

![Crear API de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-create.png)

Ahora en la ventana emergente que aparece, dé el nombre de la API y el identificador. Técnicamente podemos dar cualquier valor.

Digamos que el nombre es `hasura`y el identificador es .`https://hasura.io/learn`

![API de Autentica](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-api-audience.png)

Podemos dejar que el algoritmo de firma sea tal como es. (RS256)

Haga clic en Crear una vez que haya terminado.

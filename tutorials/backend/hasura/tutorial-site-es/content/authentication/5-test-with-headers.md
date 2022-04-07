---
title: "Prueba con token de Auth0"
metaTitle: "Prueba con token JWT de Auth0 | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte aprenderá a probar la configuración de Auth0 con Hasura mediante la obtención del token de Auth0 y la realización de consultas de GraphQL con los encabezados de autorización"
---

Hasura está configurado para utilizarse con Auth0. Ahora probemos esta configuración mediante la obtención del token de acceso de Auth0 y la realización de consultas de GraphQL con los encabezados de autorización para ver si se aplican los permisos.

Para obtener un token JWT para realizar pruebas, configuraremos una extensión en Auth0.

1. Instale la [extensión del depurador de API de autenticación](https://auth0.com/docs/extensions/authentication-api-debugger-extension). Esto nos permitirá configurar y generar un token de acceso.

Para instalar esta extensión:

Desplácese hasta la página de [extensiones](https://manage.auth0.com/#/extensions) del [panel de Auth0](https://manage.auth0.com/#),

![Depurador de extensión Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-extensions-debugger.png)

Haga clic en el cuadro del depurador de API de autenticación de Auth0. Se abre la ventana de extensión de instalación. Haga clic en Instalar.

2. Autorice la extensión

Una vez instalada la extensión, puede hacer clic en ella bajo la pestaña `Installed Extensions`. La URL será similar a `https://<auth0-domain>.<region>.webtask.run/auth0-authentication-api-debugger`

Le pedirá que inicie sesión utilizando la interfaz de usuario de inicio de sesión con Auth0. Asegúrese de iniciar sesión utilizando las credenciales que se usaron al inicio para crear la cuenta de Auth0. Este paso consiste en autorizar básicamente el uso de la extensión y permitirle acceder a leer los detalles del cliente de la aplicación.

![Autorice la aplicación de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authorize-auth0-app.png)

Una vez que haya autorizado la aplicación, debería ver la página del depurador.

3. Configure la aplicación de Auth0

En la página del depurador de API, seleccione el nombre de la aplicación que creó anteriormente en el tutorial.

![Depurador de API de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-api-debugger.png)

Ahora, copie la URL de devolución de llamada que se menciona allí. Diríjase a la página de aplicaciones de Auth0, entre en la configuración de la aplicación y agregue la URL a las «URL de devoluciones de llamada permitidas».

4. Establezca la audiencia

Cambie a la pestaña OAuth2/OIDC junto a la configuración y desplácese hacia abajo para configurar el valor de la audiencia.

![Audiencia de Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/configure-audience.png)

Introduzca el valor de la audiencia como  `https://hasura.io/learn`y active la `Use Audience`opción  junto a ella.
Si recuerda, creamos una API con el valor de la audiencia anterior en uno de los pasos anteriores.

5. Vuelva a la configuración de las extensiones para el depurador de API de autenticación de Auth0. Haga clic en el botón de inicio de sesión OAuth2/OIDC bajo los flujos de usuario. Esto le pedirá que inicie sesión como usuario. Inscríbase en esta interfaz de usuario con cualquier cuenta y una vez que inicie sesión con éxito, volverá a la página del depurador de autenticación con la respuesta de JSON impresa.

![Token de acceso del depurador de autenticación](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-debugger-access-token.png)

En la sección de fragmentos de Hash, podrá ver la clave `access_token` en el objeto.

5. Pruebe el JWT

El depurador debería proporcionarle la carga decodificada que contiene los reclamos de JWT que se han configurado para Hasura bajo la clave `https://hasura.io/jwt/claims`. Ahora dentro de este objeto, la información del rol estará disponible bajo la clave `x-hasura-role` y la información de ID de usuario estará disponible bajo la clave `x-hasura-user-id`.

A partir de ahora, podrá utilizar este token de acceso para hacer solicitudes autenticadas. En la pestaña de GraphiQL de la consola de Hasura, puede agregar un encabezado `Authorization: Bearer <access_token>` para hacer dichas solicitudes.

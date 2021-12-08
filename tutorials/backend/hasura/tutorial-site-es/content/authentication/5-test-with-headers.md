---
title: "Prueba con Auth0 Token"
metaTitle: "Autores de prueba0 JWT Token | Hasura GraphQL Tutorial"
metaDescription: "En esta parte, aprenderá a probar la configuración de Auth0 con Hasura al obtener el token de Auth0 y realizar consultas GraphQL con los encabezados de Autorización"
---

Hasura está configurado para ser utilizado con Auth0. Ahora probemos esta configuración obteniendo el token de acceso de Auth0 y realizando consultas GraphQL con los encabezados de Autorización para ver si se aplican los permisos.

Para obtener un token JWT para la prueba, vamos a configurar una extensión en Auth0.

1.Instale la [extensión del depurador de la API de autenticación](https://auth0.com/docs/extensions/authentication-api-debugger-extension). Esto nos permitirá configurar y generar un token de acceso.

Para instalar esta extensión:

Vaya a la página [Extensiones](https://manage.auth0.com/#/extensions) del Panel de [control de Auth0](https://manage.auth0.com/#),

![Auth0 Extension Debugger](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/auth0-extensions-debugger.png)

Haga clic en el cuadro Authentication API Debugger (Authentication API). Se abre la ventana de extensión de instalación. Haga clic en Instalar.

2.Autorizar la extensión

Una vez instalada la extensión, puede hacer clic en ella debajo de la `Installed Extensions`pestaña. La URL se verá similar a`https://<auth0-domain>.<region>.webtask.run/auth0-authentication-api-debugger`

Se le pedirá que inicie sesión usando la interfaz de usuario de Auth0. Asegúrate de iniciar sesión usando las credenciales utilizadas para crear la cuenta Auth0 inicialmente. Este paso es básicamente autorizar el uso de la extensión y permitirle acceder a leer los detalles del cliente de la aplicación.

![Autorizar la aplicación Auth0](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authorize-auth0-app.png)

Una vez que haya autorizado la aplicación, debe ver la página de depuradores.

3.Configurar la aplicación Auth0

En la página de depuración de API, seleccione el nombre de la aplicación que creó anteriormente en el tutorial.

![Autentico API Debugger](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-api-debugger.png)

Ahora, copie la URL de devolución de llamada mencionada allí. Vaya a su página Aplicaciones de Auth0, entra en la configuración de su aplicación y añada la URL a las URL de 'Permitida llamada de regreso'.

4.Establecer la audiencia

Cambie a la pestaña OAuth2 / OIDC junto a Configuración y desplácese hacia abajo para configurar el valor de Audiencia.

![Auténtico Público](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/configure-audience.png)

Introduzca el valor de Audiencia como `https://hasura.io/learn`y active la `Use Audience`opción junto a él. Si recuerda, creamos una API con el valor de audiencia anterior en uno de los pasos anteriores.

5.Vuelva a la configuración de las extensiones para Auth0 Authentication API Debugger. Haga clic en el botón de inicio de sesión OAuth2 / OIDC en Flujos de usuario. Esto le pedirá que inicie sesión como usuario. Regístrate en esta interfaz de usuario con cualquier cuenta y una vez que inicies sesión correctamente, se te llevará de nuevo a la página de depurador de autenticación con la respuesta JSON impresa.

![Token de acceso de depurador de autenticación](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/authentication-debugger-access-token.png)

En la sección Fragmento de Hash podrás ver la `access_token`clave en el objeto.

5.Test el JWT

El depurador debe darle la carga útil decodificada que contiene las reclamaciones JWT que se han configurado para Hasura bajo la `https://hasura.io/jwt/claims`tecla. Ahora dentro de este objeto, la información de rol estará disponible bajo la `x-hasura-role`clave y la información del usuario y la identificación estará disponible bajo la `x-hasura-user-id`clave.

A partir de ahora, podrá utilizar este access_token para realizar solicitudes autenticadas. En la pestaña Hasura Console GraphiQL, puede agregar un encabezado `Authorization: Bearer <access_token>`para hacer tales solicitudes.

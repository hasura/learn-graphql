---
title: "Modos de autenticación"
metaTitle: "Modos de autenticación | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo elegir el modo de autenticación correcto"
---

En esta parte, analizaremos los diferentes modos de autenticación. La autenticación se gestiona fuera de Hasura. Puede traer su propio servidor de autenticación e integrarlo con Hasura. A grandes rasgos, hay dos opciones disponibles.

- Modo JWT
- Modo Webhook

## Modo JWT {#jwt-mode}

Puede configurar el motor de GraphQL para utilizar el modo de autorización JWT para autorizar todas las solicitudes entrantes. Se espera que el servidor de autenticación devuelva un token de JWT válido, que el motor de GraphQL decodifica y verifica para autorizar y obtener metadatos sobre la solicitud.

Una arquitectura típica con el servidor de autenticación que emite JWT se parece a lo siguiente:

![Modo JWT](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/jwt-mode.png)

El servidor de autenticación emite tokens JWT con los reclamos `x-hasura-*` relevantes a la aplicación que luego envía el token al motor de GraphQL de Hasura. Hasura entonces valida los reclamos para permitir que la solicitud pase.

## Modo Webhook {#webhook-mode}

También puede configurar el motor de GraphQL para utilizar el modo Webhook. Su servidor de autenticación expone un webhook que se utiliza para autenticar todas las solicitudes entrantes al servidor de motor de GraphQL de Hasura y para obtener metadatos sobre la solicitud para evaluar las reglas de control de acceso.

La arquitectura con webhook se parece a la siguiente:

![Modo Webhook](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-authentication/webhook-mode.png)

### Modo no autenticado {#unauthenticated-mode}

A veces busca permitir el acceso a los datos sin que un usuario haya iniciado sesión. Esto es útil para el feed público que está abierto a todos los usuarios. Aunque nuestra aplicación Slack no tiene esto como un caso de uso, es bueno saber cuándo podría utilizarse esto.

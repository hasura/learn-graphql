---
title: "Modos de autenticación"
metaTitle: "Modos de autenticación | Tutorial de la carcasa de Hasura"
metaDescription: "Esta parte del tutorial cubre cómo elegir el modo auth correcto"
---

En esta parte, vamos a ver los diferentes modos de autenticación. La autenticación se gestiona fuera de Hasura. Puedes traer tu propio servidor de Auth e integrarlo con Hasura. Hay dos opciones disponibles en general.

- Modo JWT
- Modo Webhook

## Modo JWT

Puede configurar GraphQL Engine para que utilice el modo de autorización JWT para autorizar todas las solicitudes entrantes. Se espera que el servidor de auth devuelva un token JWT válido, que son decodificado y verificado por el motor GraphQL, para autorizar y obtener metadatos sobre la solicitud.

Una arquitectura típica con el servidor Auth que emite JWT parece la siguiente:

![Modo JWT](https://hasura.io/docs/latest/_images/jwt-auth1.png)

El servidor Auth emite tokens JWT con las `x-hasura-*`reclamaciones relevantes a la aplicación que luego envía el token a Hasura GraphQL Engine. Hasura entonces valida las reclamaciones para permitir que la solicitud se pase.

## Modo Webhook

También puede configurar GraphQL Engine para que utilice el modo Webhook. Su servidor de autenticación expone un webhook que se utiliza para autenticar todas las solicitudes entrantes al servidor de motores Hasura GraphQL y para obtener metadatos sobre la solicitud para evaluar las reglas de control de acceso.

La arquitectura con webhook se parece a la siguiente:

![Modo Webhook](https://hasura.io/docs/latest/_images/webhook-auth1.png)

### Modo no autenticado

A veces le gustaría permitir el acceso a los datos sin que un usuario haya iniciado sesión. Esto es útil para el feed público que está abierto a todos los usuarios. Aunque nuestra aplicación Slack no tiene esto como un caso de uso, es bueno saber cuándo se podría utilizar.

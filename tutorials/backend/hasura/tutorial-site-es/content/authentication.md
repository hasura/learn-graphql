---
title: "Autenticación"
metaTitle: "Autenticación con el tutorial | Hasura"
metaDescription: "Esta parte del tutorial cubre cómo hacer Autenticación en Hasura GraphQL Engine mediante la integración con un proveedor de autenticación como Auth0"
---

En esta parte, veremos cómo integrar un proveedor de autenticación.

La aplicación todo en tiempo real necesita estar protegida por una interfaz de acceso. Vamos a utilizar [Auth0](https://auth0.com) como el proveedor de identidad/autenticación para este ejemplo.

**Nota**: Auth0 tiene un plan gratuito para hasta 7000 usuarios activos.

La idea básica es que, cada vez que un usuario autentica con Auth0, la aplicación cliente recibe un token que se puede enviar en los `Authorization`encabezados de todas las solicitudes GraphQL. Hasura GraphQL Engine verificaría si el token es válido y permite al usuario realizar las consultas adecuadas.

¡Empezamos!

---
title: "Autenticación"
metaTitle: "Autenticación con Hasura | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte del tutorial vemos cómo hacer la autenticación en el motor de GraphQL de Hasura mediante la integración con un proveedor de autenticación como Auth0"
---

En esta parte analizaremos cómo integrar un proveedor de autenticación.

La aplicación de tareas pendientes en tiempo real necesita estar protegida por una interfaz de inicio de sesión. Vamos a utilizar [Auth0](https://auth0.com) como el proveedor de autenticación/identidad para este ejemplo.

**Nota**: Auth0 cuenta con un plan gratuito para hasta 7000 usuarios activos.

La idea básica es que, cada vez que un usuario se autentique con Auth0, la aplicación de cliente recibe un token que puede enviarse en los encabezados `Authorization` de todas las solicitudes de GraphQL. El motor de GraphQL de Hasura verificaría si el token es válido y permitiría al usuario realizar las consultas adecuadas.

¡Empecemos!

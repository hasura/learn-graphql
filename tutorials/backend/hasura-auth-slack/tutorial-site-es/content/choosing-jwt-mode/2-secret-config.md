---
title: "Configuración del secreto de JWT"
metaTitle: "Configuración del secreto de JWT | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo elegir el modo de autenticación correcto"
---

En esta parte, analizaremos cómo configurar el secreto de JWT.

Siga [estas](https://github.com/hasura/learn-graphql/tree/master/services/backend/auth-server) instrucciones para configurar el servidor de autenticación.

### Autentique JWT mediante el uso del motor de GraphQL {#authenticate-jwt}

El motor de GraphQL viene con la autenticación de JWT integrada.  Necesitará iniciar el motor con el mismo secreto/clave que el servidor de autenticación de JWT utilizando la variable de entorno `HASURA_GRAPHQL_JWT_SECRET`. Lea más en [docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/#running-with-jwt)

Tenga en cuenta que también necesita configurar la variable de entorno `HASURA_GRAPHQL_ADMIN_SECRET`. Considere esto como la contraseña para tener el control de administrador sobre el proyecto. [Lea más](https://hasura.io/docs/latest/graphql/cloud/projects/env-vars/) sobre cómo configurar una nueva variable de entorno en un proyecto de Hasura Cloud.

Un comando de muestra CURL utilizando el token anterior sería:

```bash
curl -X POST \
  https://ready-panda-91.hasura.app/v1/graphql \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QxMjMiLCJpYXQiOjE1NDAzNzY4MTUuODUzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZWRpdG9yIiwidXNlciIsIm1vZCJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9fQ.w9uj0FtesZOFUnwYT2KOWHr6IKWsDRuOC9G2GakBgMI' \
  -H 'Content-Type: application/json' \
  -d '{ "query": "{ users { id } }" }'
```

Ahora puede probar esto mediante la navegación a la consola y la realización de consultas sin el secreto de administrador. Debería obtener un error.

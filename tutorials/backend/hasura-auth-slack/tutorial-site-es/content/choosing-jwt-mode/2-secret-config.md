---
title: "Configurar JWT Secret"
metaTitle: "Configur de la slack de la mano de la mano"
metaDescription: "Esta parte del tutorial cubre cómo elegir el modo auth correcto"
---

En esta parte, veremos cómo configurar el secreto JWT.

Siga las instrucciones [aquí](https://github.com/hasura/learn-graphql/tree/master/services/backend/auth-server) para configurar el servidor de Auth.

### Autenticar JWT usando GraphQL Engine

El motor GraphQL viene con la autenticación JWT incorporada. Necesitará arrancar el motor con la misma llave secreta/que el servidor JWT auth usando la variable de entorno `HASURA_GRAPHQL_JWT_SECRET`. Leer más en [docs](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html#running-with-jwt)

Tenga en cuenta que también necesita configurar la variable de `HASURA_GRAPHQL_ADMIN_SECRET`entorno. Considere esto como la contraseña para tener control de administración sobre el proyecto. [Lea más](https://hasura.io/docs/latest/graphql/cloud/projects/env-vars.html) sobre cómo configurar una nueva variable de entorno en un proyecto de Hasura Cloud.

Un comando de curl de muestra con el token anterior sería:

```bash
curl -X POST \
  https://ready-panda-91.hasura.app/v1/graphql \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6InRlc3QxMjMiLCJpYXQiOjE1NDAzNzY4MTUuODUzLCJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsiZWRpdG9yIiwidXNlciIsIm1vZCJdLCJ4LWhhc3VyYS11c2VyLWlkIjoiMSIsIngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1yb2xlIjoidXNlciJ9fQ.w9uj0FtesZOFUnwYT2KOWHr6IKWsDRuOC9G2GakBgMI' \
  -H 'Content-Type: application/json' \
  -d '{ "query": "{ users { id } }" }'
```

Ahora puedes probar esto navegando a la consola y haciendo consultas sin el secreto de administrador. Lo ideal es que te cometas un error.

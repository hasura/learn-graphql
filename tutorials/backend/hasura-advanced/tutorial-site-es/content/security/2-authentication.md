---
title: "Autenticación y Autorización"
metaTitle: "Autenticación y Autorización | Tutorial avanzado de Hasura GraphQL"
metaDescription: "La autenticación puede implementarse con Hasura mediante JWT, webhooks y acceso público no autenticado. La autorización puede implementarse con Hasura mediante permisos basados en roles."
---

La autenticación puede implementarse con Hasura mediante el uso de

- [JWT](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt/)
- [Webhooks](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook/)
- [Acceso público no autenticado](https://hasura.io/docs/latest/graphql/core/auth/authentication/unauthenticated-access/)

En todos estos casos, para empezar es importante configurar un `admin secret`.

La autorización puede implementarse con Hasura mediante el uso de

- Permisos basados en roles: según el rol, el esquema, la tabla y el tipo de operación
- Establezca reglas de acceso según el rol (registros y campos) para Insertar, Seleccionar, Actualizar y Eliminar

Tanto la [Autenticación](https://hasura.io/learn/graphql/hasura/authentication/) como la [Autorización](https://hasura.io/learn/graphql/hasura/authorization/) han sido cubiertos en nuestro tutorial Aspectos básicos de Hasura. No deje de echarle un vistazo.

También disponemos, para el modelo de slack utilizado aquí, del [tutorial Autorización en Slack](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/) que trata sobre la configuración de permisos basados en roles desde cero.

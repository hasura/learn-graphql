---
title: "Autenticación y Autorización"
metaTitle: "Autenticación y Autorización | Tutorial Avanzado de Hasura"
metaDescription: "La autenticación con Hasura se puede implementar usando JWT, webhooks y acceso público no autenticado. La autorización con Hasura se puede implementar utilizando permisos basados en rol."
---

La autenticación con Hasura puede ser implementada usando

- [JWT](https://hasura.io/docs/latest/graphql/core/auth/authentication/jwt.html)
- [Webhooks](https://hasura.io/docs/latest/graphql/core/auth/authentication/webhook.html)
- [Acceso público no autenticado](https://hasura.io/docs/latest/graphql/core/auth/authentication/unauthenticated-access.html)

En todos estos casos, es importante configurar una `admin secret`para empezar.

La autorización con Hasura puede ser implementada usando

- Permisos basados en funciones: por rol, por esquema, por tabla, por tipo de operación
- Establezca las reglas de acceso a funciones (registros y campos) para Insertar, Seleccionar, Actualizar y Eliminar

Tanto [la Autenticación](https://hasura.io/learn/graphql/hasura/authentication/) como [la Autorización](https://hasura.io/learn/graphql/hasura/authorization/) han sido cubiertos en nuestro tutorial Hasura Basics. Compruebe eso.

También para el modelo slack que se utiliza en este tutorial, tenemos el [tutorial de Autorización de Slack](https://hasura.io/learn/graphql/hasura-auth-slack/introduction/) hablando sobre la configuración de permisos basados en roles desde cero.

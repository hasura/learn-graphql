---
title: "Modo Dev"
metaTitle: "Modo Dev | Tutorial avanzado de Hasura"
metaDescription: "En el dev local con código personalizado escrito, es posible que desee ver los detalles exactos de la llamada de webhook para el controlador de código personalizado como Hasura Actions."
---

En el dev local con código personalizado escrito, es posible que desee ver los detalles exactos de la llamada de webhook para el controlador de código personalizado como Hasura Actions.

## Habilitar el modo Dev

Dirígete al panel de Hasura Cloud a la configuración del proyecto y añade una nueva var.

El nuevo env var sería `HASURA_GRAPHQL_DEV_MODE`con un verdadero booleano.

![Habilitar el modo Dev](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

Una vez activada esto, esto agregaría una `extensions`clave al `errors`objeto de la respuesta. La `internal`clave contiene información de error incluyendo la instrucción SQL generada e información de excepción de Postgres.

Por supuesto, es muy recomendable habilitar este modo dev solo en entornos dev/staging y también para solo el `admin`papel. Para forzar las extensiones a trabajar solo para el rol de administrador, podemos añadir un nuevo env var llamado `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS`booleano con un `true`valor.

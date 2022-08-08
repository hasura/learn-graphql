---
title: "Modo de desarrollo"
metaTitle: "Modo de desarrollo | Tutorial avanzado de Hasura GraphQL"
metaDescription: "En dev local, con código personalizado escrito, es posible que desee consultar los detalles precisos de la solicitud webhook para el controlador de código personalizado, como Hasura Actions."
---

En dev local, con código personalizado escrito, es posible que desee consultar los detalles precisos de la solicitud webhook para el controlador de código personalizado, como Hasura Actions.

## Habilitar el Modo de desarrollo {#enable-dev-mode}

Diríjase al panel de Hasura Cloud, a la configuración del proyecto, y agregue una nueva ENV var.

La nueva env var sería `HASURA_GRAPHQL_DEV_MODE` con un true booleano.

![Habilitar el Modo de desarrollo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/enable-dev-mode.png)

Una vez habilitado, esto añadiría una clave `extensions` al objeto `errors` de la respuesta. La clave `internal` contiene información de errores, incluyendo el comando SQL generado y la información sobre excepciones de Postgres.

Por supuesto, es altamente recomendable habilitar este modo de desarrollo solo en entornos dev/staging y también solo para el rol de `admin`. Para forzar que las extensiones funcionen solo para el rol de administrador, podemos añadir una nueva env var denominada `HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS` booleana con un valor `true`.

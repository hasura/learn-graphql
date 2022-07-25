---
title: "Migraciones y Metadatos"
metaTitle: "Migraciones y metadatos | Tutorial avanzado de Hasura GraphQL"
metaDescription: "En esta sección veremos cómo gestionar las migraciones de bases de datos y los metadatos de Hasura en una configuración de entorno de desarrollo local y aprenderemos sobre el esquema de la base de datos y la configuración de los metadatos"
---

En esta sección veremos cómo gestionar las migraciones de bases de datos y los metadatos de Hasura en una configuración de entorno de desarrollo local.

Hasura necesita dos componentes para (re)crear una API de GraphQL.

- Esquema de la base de datos
- Metadatos

El esquema de la base de datos puede provenir de una base de datos existente o bien generarse desde cero. Los metadatos describirán la API de GraphQL y los diversos componentes de Hasura, como los permisos, eventos, acciones y esquemas remotos.

Hasura no genera automáticamente la API de GraphQL para la base de datos completa. Necesitaremos especificar qué tablas/vistas/funciones han de ser expuestas a través de GraphQL y esta información formará parte de los metadatos.

Utilizaremos el esquema de la base de datos del clon de slack para esta demostración. Pero antes, ejecutemos Hasura en el entorno de desarrollo local.

## Ejecutar Hasura a través de docker-compose {#running-hasura-via-docker-compose}

La configuración más sencilla para ejecutar Hasura de forma local es utilizar la configuración de docker-compose para ejecutar tanto los contenedores docker de graphql-engine como los de postgres.

Diríjase a los documentos para [configurar Hasura de forma local utilizando docker-compose](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/#step-1-get-the-docker-compose-file).

Una vez configurado Hasura de forma local, debería poder acceder a la consola en `http://localhost:8080`.

![Hasura Console OSS](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-console-oss-local.png)
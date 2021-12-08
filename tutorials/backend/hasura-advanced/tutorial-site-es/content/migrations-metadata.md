---
title: "Migraciones y Metadatos"
metaTitle: "Migraciones y metadatos | Tutorial avanzado de Hasura"
metaDescription: "En esta sección, vamos a ver cómo administrar las migraciones de bases de datos y los metadatos Hasura en una configuración local de entorno de dev y aprender sobre la configuración de esquemas de bases de datos y metadatos"
---

En esta sección, veremos cómo administrar las migraciones de bases de datos y los metadatos Hasura en una configuración local de entorno de dev.

Hasura necesita dos componentes para (re)crear una API GraphQL.

- Esquema de base de datos
- Metadatos

El esquema de base de datos puede ser de una base de datos existente o bien bien creado desde cero. Los metadatos describirán la API GraphQL y los diversos componentes de Hasura como los permisos, eventos, acciones y esquemas remotos.

Hasura no crea automáticamente la API GraphQL para toda la base de datos. Necesitaremos especificar qué tablas/vistas/funciones deben ser expuestos a través de GraphQL y esta información será parte de los metadatos.

Usaremos el esquema de base de datos de clon slack para esta demo. Pero antes de eso, vamos a ejecutar Hasura en el entorno de la empresa local.

## Correr Hasura vía docker-compose

La configuración más sencilla para ejecutar Hasura localmente es usar la configuración de composición del docker para ejecutar contenedores de docker tanto de graphql-engine como de postgres de docker.

Dirígete a los documentos para [configurar Hasura localmente usando docker-compose](https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple.html#step-1-get-the-docker-compose-file).

Una vez que haya configurado Hasura localmente, usted debe ser capaz de acceder a la consola en `http://localhost:8080`.

![Hasura Consola OSS](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/hasura-console-oss-local.png)
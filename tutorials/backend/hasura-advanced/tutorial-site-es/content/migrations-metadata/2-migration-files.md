---
title: "Gestión de archivos de migración"
metaTitle: "Gestión de archivos de migración | Tutorial avanzado"
metaDescription: "Hasura viene con un sistema de migración integrado para administrar el esquema de base de datos. Administrar el esquema de base de datos para realizar actualizaciones incrementales y reversibles que se controlan versiones es un componente crítico para las aplicaciones que se ejecutan en producción."
---

Administrar el esquema de base de datos para realizar actualizaciones incrementales y reversibles que se controlan versiones es un componente crítico para las aplicaciones que se ejecutan en producción. Hasura viene con un sistema de migración integrado para administrar el esquema de base de datos.

Más importante aún, los archivos de migración se generan automáticamente por la interfaz de usuario de la consola, cuando se sirven a través de la CLI. Esto hace que sea fácil hacer cambios en el esquema como crear tablas, columnas, funciones, vistas simplemente usando la interfaz de usuario. Lea más sobre la [arquitectura de cómo Hasura construyó la interfaz de usuario para autogenerar las migraciones de bases de datos](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/).

Por supuesto, la interfaz de usuario no es la única manera de generar archivos de migración, aunque conveniente. El `hasura`CLI le permite crear archivos de migración manualmente. Esa es la opción que vamos a utilizar a continuación para iniciar nuestro esquema para este tutorial.

[Descargue el archivo SQL](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql) y ejecute el siguiente comando.

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

Actualice la ruta de acceso al archivo SQL apropiadamente. Esto crearía un archivo de migración con el contenido del archivo SQL anterior. Compruebe los archivos de migración recién creados en el `migrations`directorio de su proyecto hasura.

A continuación, ejecute el siguiente comando:

```bash
hasura migrate apply --database-name default
```

Esto aplicaría los archivos de migración presentes en el `migrations`directorio, siguiendo el orden de los archivos.

Ahora dirígete a `http://localhost:9695/console/data`(la pestaña Datos) para ver la lista de tablas no rastreadas. Estas son las tablas que formaban parte del archivo SQL utilizado en la migración inicial.

Si está buscando restablecer la migración, siga esta entrada del blog [Restablecer las migraciones de Hasura](https://hasura.io/blog/resetting-hasura-migrations/)

**Nota**: Usar el sistema de migración de Hasura's es opcional. En caso de que se sienta cómodo o familiar utilizando otras herramientas de migración de bases de datos, puede continuar utilizando eso para administrar su esquema de base de datos. Para desactivar la migración de Hasura's puede hacerlo a través de la Consola que sirve el CLI. Dirígete a la pestaña Datos -> Migraciones y desactive la opción de `Allow Postgres schema changes via console`desactivación.

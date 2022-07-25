---
title: "Gestión de los archivos de migración"
metaTitle: "Gestión de los archivos de migración | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Hasura cuenta con un sistema de migración integrado para gestionar el esquema de la base de datos. Gestionar el esquema de la base de datos para realizar actualizaciones incrementales y reversibles con control de versiones es un componente fundamental para las aplicaciones que se ejecutan en producción."
---

Gestionar el esquema de la base de datos para realizar actualizaciones incrementales y reversibles con control de versiones es un componente fundamental para las aplicaciones que se ejecutan en producción. Hasura cuenta con un sistema de migración integrado para gestionar el esquema de la base de datos.

Y lo que es más importante, la interfaz de usuario de la consola genera automáticamente los archivos de migración cuando se sirven a través de la CLI. Esto hace mucho más sencillo realizar cambios en el esquema, como crear tablas, columnas, funciones y vistas, simplemente utilizando la interfaz de usuario. Obtenga más información sobre la [arquitectura de cómo Hasura construyó la interfaz de usuario para autogenerar las migraciones de base de datos](https://hasura.io/blog/building-a-ui-for-postgresql-database-migrations/).

Por supuesto, la interfaz de usuario no es la única manera de generar archivos de migración, aunque resulte conveniente. La `hasura` CLI le permite crear archivos de migración de forma manual. Esta es la opción que vamos a utilizar a continuación para inicializar nuestro esquema para este tutorial.

[Descargue el archivo SQL](https://raw.githubusercontent.com/hasura/learn-graphql/master/tutorials/backend/hasura-advanced/sql/slack-schema.sql) y ejecute el siguiente comando.

```bash
hasura migrate create init --sql-from-file `/path/to/schema.sql` --database-name default
```

Actualice adecuadamente la ruta del archivo SQL. Esto crearía un archivo de migración con los contenidos del archivo SQL anterior. Compruebe los recién creados archivos de migración en el directorio `migrations` de su proyecto Hasura.

A continuación, ejecute el siguiente comando:

```bash
hasura migrate apply --database-name default
```

Esto aplicaría los archivos de migración presentes en el directorio `migrations`, según el orden de los archivos.

Ahora, diríjase a `http://localhost:9695/console/data` (la pestaña Datos) para consultar la lista de tablas sin seguimiento. Estas son las tablas que formaban parte del archivo SQL utilizado en la migración inicial.

Si desea restablecer la migración, siga esta entrada de blog [Restablecimiento de migraciones de Hasura](https://hasura.io/blog/resetting-hasura-migrations/)

**Nota**: utilizar el sistema de migración de Hasura es opcional. Si se siente cómodo o está familiarizado con otras herramientas de migración de bases de datos, puede seguir utilizándolas para gestionar el esquema de su base de datos. Puede deshabilitar la migración de Hasura a través de la Consola provista por la CLI. Diríjase a la pestaña Datos -> Migraciones y desactive el conmutador `Allow Postgres schema changes via console`.

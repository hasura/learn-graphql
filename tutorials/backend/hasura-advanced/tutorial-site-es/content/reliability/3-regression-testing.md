---
title: "Pruebas de regresión"
metaTitle: "Pruebas de regresión | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Las pruebas de regresión garantizan la compatibilidad continua con las operaciones requeridas por las aplicaciones o los usuarios de frontend"
---

Las pruebas de regresión garantizan la compatibilidad continua con las operaciones requeridas por las aplicaciones o los usuarios de frontend. Es decir, la validación de los cambios en el esquema GraphQL (integridad del esquema) en relación con estas operaciones para garantizar que no haya cambios disruptivos ni regresiones en su API de GraphQL.

![Pruebas de regresión con Hasura](https://hasura.io/blog/content/images/2020/02/regression-testing-diagram-2.png)

Normalmente, la instancia de producción debería configurarse para ejecutar conjuntos de pruebas de regresión, ya que los cambios en el [esquema Postgres](https://hasura.io/learn/database/postgresql/core-concepts/1-postgresql-schema/) subyacente y/o la configuración de Hasura podrían dar lugar a regresiones no deseadas en el esquema. Esto es crucial para probar nuevas funciones o eliminar funciones existentes.

## Crear un conjunto de pruebas {#create-test-suite}

En la consola Hasura Cloud, en la pestaña Pro/Monitorización, diríjase al `Regresstion Tests` del final. Seleccione las acciones a las que suele accederse desde el cliente frontend. En nuestro modelo de slack, deberíamos agregar tanto los usuarios como las consultas del canal que hayamos probado hasta entonces. Haga clic en `Add to test suite`. Una vez agregado esto podremos realizar un cambio en el esquema para verificar si se ha detectado alguna regresión.

![Crear un conjunto](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-suite.png)

Abra la consola Hasura a través de la CLI. (`http://localhost:9695`). Ahora vamos a realizar un cambio de esquema en la tabla de canales para renombrar la columna `name` como `channel_name`.

A continuación, ejecute el conjunto de pruebas a través de la pestaña `Run Tests`. Ahora, la consulta del canal debería fallar.

![Ejecutar un conjunto de pruebas de regresión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-run.png)

Con el siguiente error `field "name" not found in type: 'channel'`.

Este tipo de pruebas garantizan que los cambios disruptivos no pasen a producción sin las actualizaciones pertinentes para el cliente.

**Nota**: podemos seleccionar el conjunto de pruebas desde cualquier otro proyecto en la nube para ejecutarlo en el proyecto actual. Esto resulta útil cuando el conjunto de pruebas configurado en la instancia de producción funciona en el entorno de ensayo tras el cambio del esquema.

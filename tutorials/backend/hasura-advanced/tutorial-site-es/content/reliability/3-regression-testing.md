---
title: "Pruebas de Regresión"
metaTitle: "Testing  Tutorial avanzado de Hasura GraphQL."
metaDescription: "Las pruebas de regresión garantizan un soporte continuo para las operaciones requeridas por sus aplicaciones o usuarios frontend"
---

Las pruebas de regresión garantizan un soporte continuo para las operaciones requeridas por sus aplicaciones frontend o usuarios, es decir, validar cambios en el esquema GraphQL (integridad del esquema) contra estas operaciones para garantizar que no haya cambios o regresiones de ruptura en su API GraphQL.

![Pruebas de Regresión con Hasura](https://hasura.io/blog/content/images/2020/02/regression-testing-diagram-2.png)

La instancia de producción normalmente debe configurarse para ejecutar conjuntos de pruebas de regresión, ya que los cambios en el [esquema subyacente de Postgres](https://hasura.io/learn/database/postgresql/core-concepts/1-postgresql-schema/) y/o la configuración de Hasura podrían conducir a regresiones no deseadas en su esquema. Esto es crucial para iterar nuevas características o eliminar las características existentes.

## Crear una suite de prueba

`Regresstion Tests`En la consola Hasura Cloud, en la pestaña Pro/Monitoreo, diríjase al final. Seleccione las acciones a las que se accede normalmente desde el cliente frontend. En nuestro modelo de slack, queremos añadir tanto a los usuarios como a la consulta de canal que hemos intentado hasta ahora. Haga clic en `Add to test suite`. Una vez que se agrega, ahora podemos hacer un cambio de esquema para verificar si se ha capturado una regresión.

![Crear una suite](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-suite.png)

Abra la Consola Hasura a través de la CLI. (`http://localhost:9695`). Ahora hagamos un cambio de esquema a la tabla de canal para cambiar el nombre de la `name`columna a .`channel_name`

A continuación, ejecute el paquete de prueba a través de la `Run Tests`pestaña. La consulta del canal ahora debe fallar.

![Ejecutar una suite de prueba de regresión](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-run.png)

Con el siguiente `field "name" not found in type: 'channel'`error.

Este tipo de pruebas aseguran que los cambios de rotura no se empujan a la producción sin las actualizaciones relevantes para el cliente.

**Nota**: Podemos seleccionar el paquete de pruebas de cualquier otro proyecto en la nube para ejecutarse en el proyecto actual. Esto es útil cuando el conjunto de pruebas configurado en la instancia de producción funciona en el entorno de puesta en escena del cambio del esquema.

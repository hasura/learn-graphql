---
title: "Control de acceso"
metaTitle: "Autorización con Hasura | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo hacer la autorización en el motor de GraphQL de Hasura mediante la definición de reglas de control de acceso basadas en el rol para los modelos."
---

En esta parte del tutorial, vamos a definir reglas de control de acceso basadas en el rol para cada uno de los modelos que creamos. Las reglas de control de acceso ayudan a restringir las consultas en una tabla basándose en ciertas condiciones.

Se pueden aplicar reglas de control de acceso

- Nivel de fila
- Nivel de columna

## Nivel de fila {#row-level}

Con el control de acceso del nivel de la fila, los usuarios pueden acceder a las tablas sin tener acceso a todas las filas en esa tabla. Esto es particularmente útil para proteger los datos personales sensibles que son parte de la tabla. De esta manera, puede permitir que todos los usuarios accedan a una tabla, pero solo a un número específico de filas en esa tabla.

![Control de acceso de nivel de fila](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/row-level-access-control.png)

## Nivel de columna {#column-level}

El control de acceso del nivel de columna le permite restringir el acceso a ciertas columnas en la tabla. Esto es útil para ocultar datos que no son relevantes, son sensibles o se usan con fines internos. Una representación típica de los datos se ve como:

![Control de acceso de nivel de columna](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/column-level-access-control.png)

Como puede imaginar, la combinación de estas reglas ofrece una manera flexible y potente de controlar el acceso de los datos a diferentes partes interesadas involucradas.

## Tipos de operaciones {#types-of-operations}

Se pueden aplicar reglas de control de acceso a todas las operaciones de CRUD (crear, leer, actualizar y eliminar). Algunas operaciones pueden restringirse por completo para no permitir que el usuario realice la operación.

En la sección anterior aprendimos que la aplicación slack requiere un rol llamado `user`. Crearemos permisos para este rol en la siguiente parte.
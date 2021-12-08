---
title: "Control de acceso"
metaTitle: "Autorización con el Tutorial | Hasura Auth Slack"
metaDescription: "Esta parte del tutorial cubre cómo hacer Autorización en Hasura GraphQL Engine al definir reglas de control de acceso basadas en roles para los modelos."
---

En esta parte del tutorial, vamos a definir reglas de control de acceso basadas en roles para cada uno de los modelos que creamos. Las reglas de control de acceso ayudan a restringir la consulta en una tabla basada en ciertas condiciones.

Las reglas de control de acceso se pueden aplicar en

- Nivel de fila
- Nivel de columna

## Nivel de fila

Con el control de acceso a nivel de fila, los usuarios pueden acceder a las tablas sin tener acceso a todas las filas de esa tabla. Esto es particularmente útil para proteger los datos personales sensibles que forman parte de la tabla. De esta manera, puedes permitir que todos los usuarios accedan a una tabla, pero solo un número específico de filas en esa tabla.

![Control de acceso de nivel de fila](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/row-level-access-control.png)

## Nivel de columna

El control de acceso a nivel de columna permite restringir el acceso a ciertas columnas de la tabla. Esto es útil para ocultar datos que no son relevantes, sensibles o utilizados con fines internos. Una representación típica de los datos se ve como:

![Control de acceso de nivel de columna](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/column-level-access-control.png)

Como puede imaginar, combinar estas dos reglas ofrece una forma flexible y poderosa de controlar el acceso a los datos a diferentes partes interesadas involucradas.

## Tipos de operaciones

Las reglas de control de acceso se pueden aplicar a todas las operaciones CRUD (Crear, Leer, Actualizar y Eliminar). Algunas operaciones pueden estar completamente restringidas para no permitir que el usuario realice la operación.

En la sección anterior nos enteramos de que la aplicación slack requiere un rol llamado `user`. Crearemos permisos para este papel en la siguiente parte.
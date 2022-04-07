---
title: "Definición de roles"
metaTitle: "Definición de roles | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Aprenda a elegir entre un solo rol frente a varios roles"
---

En esta sección, analizaremos cómo abordar los roles de modelado en general para los permisos con Hasura.

Tradicionalmente, considerará varios roles basados en las responsabilidades que se asignan al usuario.

En el modelo de la aplicación slack, un análisis rápido le dará posibilidades para varios roles. Existen `users` de la aplicación, `workspace owners` que controlan y gestionan el espacio de trabajo, `workspace admins` que tienen un subconjunto de permisos para gestionar el espacio de trabajo, `channel admins` y demás. Pero lo importante a tener en cuenta es que son todos `users` de la aplicación, solo que tienen más permisos para leer/escribir algunos datos. Esto nos deja definir un solo rol llamado `user` que puede acomodar la capa de permiso anterior. Veremos cómo se hace en las secciones posteriores.

Lo más probable es que solo necesite un rol con Hasura para los usuarios de la aplicación. Pero hay casos en los que realmente necesita varios roles para controlar el acceso de datos.

## El caso para varios roles {#multiple-roles}

Entonces, ¿cuándo se utilizan varios roles para definir los permisos? Echemos un vistazo a algunos de los casos de uso.

#### Con inicio de sesión frente a datos de acceso público {#logged-in-publicly}

Cuando algunos de los datos en la aplicación son visibles públicamente, pero algunos solo están disponibles para los usuarios registrados, entonces la opción adecuada es tener varios roles. En la aplicación slack, se supone que todo está disponible solo para los usuarios registrados.

#### Diferentes accesos a las columnas {#different-access}

En los casos en que las columnas a las que se puede acceder difieran en función de quién está registrado, entonces se utilizan varios roles. Por ejemplo, en el modelo de la aplicación slack, el propietario del espacio de trabajo puede ver algunas columnas que son sensibles y con acceso de lectura restringido a otros usuarios, entonces naturalmente, necesitamos definir varios roles.

#### Equipos administrador/soporte de backend {#backend-support}

Si la aplicación tiene equipos de administrador/atención al cliente/análisis que necesitan acceso de lectura en todas las tablas sin restricciones, entonces tendrán sus propios roles individuales.

Puede lograrlo con un solo rol si no tiene las restricciones anteriores.





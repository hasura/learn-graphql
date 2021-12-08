---
title: "Definir roles"
metaTitle: "Defin Hasura Tutorial de la cartera de la cartera"
metaDescription: "Aprende a elegir entre roles individuales vs múltiples"
---

En esta sección, veremos cómo abordar generalmente los roles de modelado para los permisos con Hasura.

Tradicionalmente considerarás múltiples roles basados en las responsabilidades asignadas al usuario.

En el modelo de aplicación slack, un análisis rápido le dará posibilidades para múltiples funciones. Hay `users`de la aplicación, `workspace owners`que controla y administra el espacio de trabajo, `workspace admins`que tiene un subconjunto de permisos para administrar el espacio de trabajo, y `channel admins`así sucesivamente. Pero lo importante a tener en cuenta es que son todos de la aplicación con solo permisos adicionales para leer / escribir algunos datos. Esto nos deja definir un solo rol llamado `user`que puede acomodar la capa `users`de permiso anterior. Veremos cómo en las secciones más adelante.

Lo más probable es que solo necesites un rol con Hasura para los usuarios de tu aplicación. Pero hay casos en los que realmente necesitas múltiples roles para controlar el acceso a datos.

## El caso de múltiples roles

Entonces, ¿cuándo se utilizan múltiples roles para definir permisos? Echemos un vistazo a algunos de los casos de uso.

#### Datos accesibles al público

Cuando una parte de los datos de la aplicación es visible públicamente, pero algunos están disponibles solo para los usuarios que han iniciado sesión, entonces múltiples roles son el camino a seguir. En la aplicación slack, se supone que todo está disponible solo para los usuarios que han iniciado sesión.

#### Acceso diferente a las columnas

En los casos en que las columnas a las que se puede acceder difieren según quién ha iniciado sesión, se utilizan múltiples funciones. Por ejemplo, en el modelo de aplicación slack, el propietario del espacio de trabajo puede ver algunas columnas que son sensibles y restringidas el acceso de lectura a otros usuarios, entonces naturalmente necesitamos definir múltiples roles.

#### Soporte de backend / equipos de administración

Si tu aplicación tiene equipos de soporte administrativo/cliente y analítica que necesitan leer el acceso a través de tablas sin restricciones, entonces tendrán sus propios roles individuales.

Puedes salir con un solo rol si no tienes las restricciones anteriores.





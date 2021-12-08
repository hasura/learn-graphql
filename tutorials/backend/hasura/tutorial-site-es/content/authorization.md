---
title: "Autorización"
metaTitle: "Autorización con el tutorial H Hasura"
metaDescription: "Esta parte del tutorial cubre cómo hacer Autorización en Hasura GraphQL Engine al definir reglas de control de acceso basadas en roles para los modelos."
---

En esta parte del tutorial, vamos a definir reglas de control de acceso basadas en roles para cada uno de los modelos que creamos.

Las reglas de control de acceso ayudan a restringir la consulta en una tabla basada en ciertas condiciones.

En este caso de uso de aplicaciones en tiempo real, necesitamos restringir todas las consultas solo para los usuarios que han iniciado sesión. Además, ciertas columnas en las tablas no necesitan estar expuestas al usuario.

El objetivo de la aplicación es permitir a los usuarios gestionar sus propios todos solo pero debe poder ver todos los públicos todos.

Definiremos todas estas reglas basadas en reglas de control de acceso basadas en roles en los pasos posteriores.

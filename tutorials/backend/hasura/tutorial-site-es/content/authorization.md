---
title: "Autorización"
metaTitle: "Autorización con Hasura | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte del tutorial se explica cómo hacer Autorización en el motor de GraphQL de Hasura mediante la definición de reglas de control de acceso basadas en el rol para los modelos."
---

En esta parte del tutorial vamos a definir reglas de control de acceso basadas en el rol para cada uno de los modelos que creamos.

Las reglas de control de acceso ayudan a restringir las consultas en una tabla basándose en ciertas condiciones.

En este caso de uso de aplicaciones de tareas pendientes en tiempo real, necesitamos restringir todas las consultas solo para los usuarios registrados. Además, ciertas columnas de las tablas no necesitan estar expuestas al usuario.

El objetivo de la aplicación es permitir a los usuarios gestionar solo sus propias tareas pendientes pero debería poder ver todas las tareas pendientes públicas.

Definiremos todas estas reglas de control de acceso basadas en el rol en los pasos siguientes.

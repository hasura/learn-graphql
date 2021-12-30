---
title: "Pensar en roles"
metaTitle: "Pensar en roles | Tutorial de Slack de autenticación de Hasura"
metaDescription: "El control de acceso basado en roles en Hasura permite al servidor controlar a qué datos accede cada usuario en el cliente. Esto puede hacer cumplir las restricciones granulares sobre el acceso de datos."
---

En esta parte del tutorial, analizaremos cómo modelar los roles para la aplicación.

El control de acceso basado en roles permite al servidor controlar a qué datos accede cada usuario en el cliente. Esto puede hacer cumplir las restricciones granulares sobre el acceso de datos.

Pensemos en los diferentes conjuntos de roles aplicables a los usuarios de Slack.

Podemos clasificar ampliamente los roles como:
- `Hierarchical and Flat` o
- `Administrative and Non-Administrative`

Cada miembro de Slack tiene un rol y cada uno de ellos tiene un nivel diferente de permisos. Por ejemplo, cada espacio de trabajo en Slack cuenta con un propietario que lo creó. El propietario, junto con algunos administradores, podría gestionar completamente el espacio de trabajo mientras que los miembros del espacio de trabajo solo llegan a participar.

Además de todos estos hay un rol de administrador que puede hacer todo lo posible en el backend desde la creación de espacios de trabajo, usuarios y la eliminación de los registros.

 Analicemos específicamente cada modelo de datos para ver quién puede hacer qué.

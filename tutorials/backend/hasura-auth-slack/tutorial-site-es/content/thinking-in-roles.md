---
title: "Pensando en roles"
metaTitle: "Pensando en roles | Hasura Auth Slack Tutorial"
metaDescription: "El control de acceso basado en roles en Hasura permite al servidor controlar a qué datos acceden cada usuario en el cliente. Esto puede hacer cumplir restricciones granulares en el acceso a datos."
---

En esta parte del tutorial, vamos a ver cómo modelar roles para la aplicación.

El control de acceso basado en roles permite al servidor controlar qué datos acceden cada usuario en el cliente. Esto puede hacer cumplir restricciones granulares en el acceso a datos.

Pensemos en el conjunto de diferentes roles aplicables a los usuarios de Slack.

Podemos clasificar ampliamente los roles como:
- `Hierarchical and Flat`o
- `Administrative and Non-Administrative`

Cada miembro de Slack tiene un papel y cada uno tiene un nivel diferente de permisos. Por ejemplo, cada espacio de trabajo en Slack tiene un propietario que lo creó. El propietario, junto con algunos administradores podrían gestionar completamente el espacio de trabajo donde los miembros del espacio de trabajo solo pueden participar.

Además de todo esto hay un rol de administrador que puede hacer todo lo que está en el backend desde la creación de espacios de trabajo, usuarios y borrar registros.

Vamos a disecar cada modelo de datos para ver quién puede hacer qué.

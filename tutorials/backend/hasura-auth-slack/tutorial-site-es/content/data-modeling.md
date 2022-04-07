---
title: "Modelado de datos: Slack"
metaTitle: "Modelado de datos de Slack con Hasura | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Este tutorial cubre cómo hacer el modelado de datos en Postgres y crear tablas utilizando la consola de Hasura para un clon de Slack"
---

En esta parte del curso, construiremos el modelo de datos para un clon de slack en tiempo real. Nuestra aplicación de slack tendrá las siguientes características básicas:

- Los usuarios pueden registrarse.
- Los usuarios pueden crear espacios de trabajo.
- Los espacios de trabajo pueden ser gestionados por el propietario del espacio de trabajo o el administrador del espacio de trabajo.
- Pueden agregarse usuarios a los canales en el espacio de trabajo del que forman parte.
- Los usuarios pueden enviar mensajes a los canales en el espacio de trabajo del que forman parte.
- Los usuarios pueden enviar mensajes a otros usuarios en el mismo espacio de trabajo.
- Los usuarios pueden ver qué usuarios están en línea en el espacio de trabajo del que forman parte.

En general, esto significa que tenemos pocos modelos de nivel superior en esta aplicación.

Los analizaremos en los pasos siguientes.
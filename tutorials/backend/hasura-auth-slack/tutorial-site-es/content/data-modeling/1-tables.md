---
title: "Tablas para el clon de Slack"
metaTitle: "Tablas | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Modelado de datos para el clon de Slack"
---

Empecemos por mirar el modelo de datos.

## Usuarios {#users}

La funcionalidad principal de la aplicación gira en torno a los usuarios y sus mensajes.

Así que tenemos las siguientes tablas.

- `users` y `user_message`

## Espacio de trabajo {#workspace}

La aplicación de Slack cuenta con espacios de trabajo a los que los usuarios pueden unirse. Lo gestionan el propietario y los administradores del espacio de trabajo. Las siguientes tablas se encargan de este requisito.

- `workspace`,  `workspace_member` y `workspace_user_type`

## Canal {#channel}

Cada espacio de trabajo puede tener canales que se limiten a un tema específico de discusión que tenga el subconjunto de miembros desde el espacio de trabajo. Los miembros del canal pueden publicar mensajes en el canal que todos pueden ver.

- `channel`, `channel_member`, `channel_thread` y `channel_thread_message`

El modelo final se parece aproximadamente a lo siguiente con las columnas básicas de relaciones:

![Modelo de datos de Slack](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-datamodel.png)

Tenga en cuenta que no tiene la lista de columnas detallada, pero debería dar una idea de las relaciones entre diferentes entidades.

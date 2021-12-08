---
title: "Tablas para Clon de Slack"
metaTitle: "Tablas | Tutorial de la cartera de Hasura"
metaDescription: "Modelado de datos para Slack Clone"
---

Vamos a empezar por mirar el modelo de datos.

## Usuarios

La funcionalidad principal de la aplicación gira en torno a los usuarios y sus mensajes.

Así que tenemos las siguientes tablas.

- `users`y`user_message`

## Espacio de trabajo

La aplicación Slack tiene espacios de trabajo donde los usuarios pueden unirse. Es gestionado por el propietario y los administradores del espacio de trabajo. Las tablas siguientes se ocupan de este requisito.

- `workspace`, `workspace_member`y`workspace_user_type`

## Canal

Cada espacio de trabajo puede tener canales ampliados a un tema específico de discusión que tenga subconjunto de miembros del espacio de trabajo. Los miembros del canal pueden publicar mensajes en el canal que todos pueden ver.

- `channel``channel_member`, `channel_thread`y`channel_thread_message`

El modelo final se parece aproximadamente a lo siguiente con columnas relacionales básicas:

![Slack Modelo de datos](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-auth/slack-datamodel.png)

Tenga en cuenta que no tiene la lista de columnas detalladas, pero debe dar una idea de las relaciones entre diferentes entidades.

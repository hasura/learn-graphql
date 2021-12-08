---
title: "Función de usuario para la aplicación"
metaTitle: "Función de usuario | Tutorial de la cartera de Hasura"
metaDescription: "Aprenda a aplicar todas las acciones administrativas y no administrativas con función de usuario"
---

En esta aplicación de slack en tiempo real, necesitamos restringir todas las consultas solo para los usuarios que han iniciado sesión. Suponemos que los datos no son accesibles públicamente. Todo gira en torno a lo que hacen los usuarios en la aplicación. También ciertas columnas en las tablas no necesitan estar expuestas al usuario.

Veamos las diferentes responsabilidades que un usuario puede tener.

## Administrativo

Todas las tareas administrativas requieren acceso de escritura a la base de datos. Algunas de las tareas administrativas son

- Crear y administrar espacios de trabajo
- Crear y administrar canales
- Añadir miembros al espacio de trabajo y al canal

## No Administrativo

Las tareas no administrativas requieren acceso de lectura y escritura a la base de datos.

Por ejemplo, en una aplicación de Slack tienes Miembros. Pueden unirse a un espacio de trabajo de Slack. Pueden usar Slack para comunicarse y colaborar con otros miembros.

- El usuario puede leer y enviar mensajes a los canales
- El usuario puede leer y enviar mensajes a otros usuarios en el mismo espacio de trabajo

Tenemos que ser capaces de aplicar estas acciones a un papel. Veremos cómo en la siguiente sección.
---
title: "Rol de usuario para la aplicación"
metaTitle: "Rol de usuario | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Aprenda a aplicar todas las acciones administrativas y no administrativas con el rol de usuario"
---

En esta aplicación de slack en tiempo real, necesitamos restringir todas las consultas solo para los usuarios registrados. Asumimos que los datos no son accesibles públicamente. Todo gira en torno a lo que hacen los usuarios en la aplicación. También, ciertas columnas en las tablas no necesitan estar expuestas al usuario.

Veamos las diferentes responsabilidades que un usuario puede tener.

## Administrativo {#adminstrative}

Todas las tareas administrativas requieren acceso de escritura a la base de datos. Algunas tareas administrativas son

- Crear y gestionar los espacios de trabajo
- Crear y gestionar los canales
- Agregar miembros al espacio de trabajo y al canal

## No administrativo {#non-administrative}

Las tareas no administrativas requieren lectura y escritura ampliadas y acceso a la base de datos.

Por ejemplo, en una aplicación de Slack hay miembros. Pueden unirse a un espacio de trabajo de Slack. Pueden utilizar Slack para comunicarse y colaborar con otros miembros.

- El usuario puede leer y enviar mensajes a los canales
- El usuario puede leer y enviar mensajes a otros usuarios en el mismo espacio de trabajo

Necesitamos poder aplicar estas acciones a un rol. Veremos cómo se hace en las secciones posteriores.
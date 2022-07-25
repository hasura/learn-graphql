---
title: "Actualizaciones optimistas de la interfaz de usuario tras una mutación"
metaTitle: "Actualización optimistas de la interfaz de usuario tras una mutación | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "Utilizaremos la Respuesta optimista del cliente Apollo para realizar actualizaciones de la interfaz de usuario tras una mutación GraphQL en la aplicación React"
---

Habremos observado que, cuando los usuarios crean una tarea pendiente, se da una latencia.
 También podemos crear interfaces de usuario donde la interfaz de usuario se actualiza de forma optimista, suponiendo
 que la mutación vaya a tener éxito.

Para habilitar la alternancia entre estados completados, y para borrar las tareas pendientes, vamos a
 utilizar las actualizaciones optimistas al ejecutar mutaciones.

Aprenderemos los siguientes conceptos:

- Crear una mutación GraphQL
- Utilizar el hook React `useMutation`
- Integrar las actualizaciones optimistas de la interfaz de usuario
- Capturar los estados de carga/finalización/error

¡Empecemos!

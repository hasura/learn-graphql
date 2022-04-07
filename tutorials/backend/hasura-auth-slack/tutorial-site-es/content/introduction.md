---
title: "Introducción al curso"
metaTitle: "Introducción al curso | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Un tutorial potente y conciso que le dará una introducción para configurar un backend de clon de Slack en GraphQL con un recorrido de autenticación y permisos de modelación"
---

Este curso es una introducción superrápida para modelar y pensar en la autenticación con Hasura GraphQL.

En 30 minutos, configurará un backend de GraphQL seguro, potente y en tiempo real para un clon de Slack

## Prerrequisitos {#prerequisites}

- Debería tener cierta familiaridad con Hasura para sumergirse rápidamente en las secciones de autenticación en las que se centra este curso. En caso de que sea nuevo en Hasura, le recomendamos que revise el curso [Introducción al backend de Hasura](https://hasura.io/learn/graphql/hasura/introduction/) antes de hacer este.

## ¿Qué voy a aprender? {#what-will-i-learn}

Este curso le ayudará a entender cómo pensar en los permisos y el control de acceso con Hasura.

- Roles: defina los roles según los requisitos de negocio
- Control de acceso: quién puede acceder a qué parte de la base de datos.
- Modo de autorización: configure la autorización para que los usuarios de la aplicación solo puedan ejecutar operaciones en los datos a los que deberían tener permiso.
- Autenticación: integre un proveedor de autenticación basado en JWT (Node.js/Passport) con Hasura.
- Autenticación con servicios externos: agregue una resolución de GraphQL personalizada y los encabezados hacia adelante para gestionar los permisos.
- Listas de permisos: esté listo para la producción mediante el permiso para solo una lista de consultas que especifique.
- Implementaciones del lado del cliente: cómo configurar los encabezados en las solicitudes http simples y los sockets web para los datos en tiempo real y los encabezados x-hasura-* personalizados.

## ¿Qué vamos a construir? {#what-will-we-be-building}

Vamos a construir el backend de un clon de Slack básico mediante la configuración de los permisos para que los datos correctos estén expuestos al usuario correcto. No habrá ningún edificio de aplicaciones de frontend asociado a este tutorial.

## ¿Qué necesito para realizar este tutorial? {#what-do-i-need}

- Hasura CLI ([Docs](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/))
- Node.js 8+ instalado para configurar el servidor de autenticación más adelante.

Hemos mantenido el foco de este curso sobre los flujos de trabajo de los desarrolladores y
las opciones de entorno para que pueda centrarse en los conceptos clave y
continúe configurando sus herramientas y flujos de trabajo favoritos.

## ¿Cuánto tiempo llevará este tutorial? {#how-long}

Unos 30 minutos.

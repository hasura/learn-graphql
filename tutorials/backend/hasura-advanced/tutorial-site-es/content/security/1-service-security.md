---
title: "Seguridad del nivel de servicio"
metaTitle: "Seguridad de nivel de servicio | Tutorial avanzado de Hasura"
metaDescription: "Hasura permite determinar el acceso a nivel de servicio. Hay varias configuraciones que se pueden hacer para asegurar el acceso a datos en múltiples capas. Ahora vamos a mirar a cada uno de ellos."
---

Hasura permite determinar el acceso a nivel de servicio. Hay varias configuraciones que se pueden hacer para asegurar el acceso a datos en múltiples capas. Ahora vamos a mirar a cada uno de ellos.

## Configurar un secreto de API

Es posible que haya configurado ya una `admin secret`para asegurar la API GraphQL inicialmente. Esto será seguido por un sistema de permisos basado en roles para el acceso a datos. Pero si está utilizando código personalizado a través de `Actions`, `Remote Schemas`y `Events`entonces necesita una manera de poder restringir ese código personalizado para ser llamado solo por Hasura y no desde ningún otro lugar.

Esto requiere confianza entre el servidor Hasura y el servidor de código personalizado. Esta confianza se establece a través de un secreto de API compartido.

Al crear un esquema de acción/remoto/eventos, puede agregar encabezados personalizados como el siguiente:

![Secreto compartido a través de encabezados](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/shared-secret.png)

## Establecer políticas CORS

De forma predeterminada, Hasura permite todas las solicitudes de CORS. En un escenario de producción, es posible que desee restringir las consultas que se realizarán por pocos dominios seleccionados.

Por ejemplo, si su aplicación está alojada en un dominio, por ejemplo, https://example.com, puede permitir que cualquier solicitud provenga de este y de cualquiera de sus subdominios habilitando la configuración https://example.com,

![Dominio de Cors](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cors-domain.png)

Por supuesto, esta restricción se aplica solo en el lado del cliente (navegador). Dado que la API es accesible públicamente en cualquier caso, estas políticas son útiles solo para restringir las solicitudes realizadas desde el navegador. Esto todavía no impide que nadie haga solicitudes de servidor o de aplicaciones móviles, por ejemplo, y no debe ser utilizado como un medio para restringir tales casos de todos modos.

## SSL y HTTPS

Los proyectos de Hasura Cloud vienen con SSL gratuito para todas las aplicaciones, incluidos los dominios personalizados y, por lo tanto, las API son accesibles a través de consultas `https`regulares y `wss`para consultas de suscripción en tiempo real.

Tenga en cuenta que se `wss`puede utilizar para hacer todas las solicitudes. (No solo las suscripciones, sino que las consultas y las mutaciones también funcionan).

## Gestionar a los miembros del equipo y sus niveles de acceso

En Hasura Cloud, puede compartir acceso de consola a diferentes miembros del equipo con acceso restringido. Puede hacerlo añadiendo colaboradores en la página de configuración del proyecto como se indica a continuación:

![Consola de equipo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/collaborator.png)

Hay dos niveles de acceso al proyecto Hasura Cloud:

- `admin`tiene acceso para realizar llamadas API y ver métricas y configurar reglas sin restricciones.
- `user`tiene acceso limitado dependiendo de si se proporcionaron permisos para ejecutar las métricas de GraphQL y Viewing.

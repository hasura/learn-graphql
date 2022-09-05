---
title: "Seguridad de nivel de servicio"
metaTitle: "Seguridad de nivel de servicio | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Hasura permite determinar el acceso según el nivel de servicio. Existen varias configuraciones que pueden realizarse para asegurar el acceso a los datos en las distintas capas. A continuación, vamos a analizar cada una de ellas."
---

Hasura permite determinar el acceso según el nivel de servicio. Existen varias configuraciones que pueden realizarse para asegurar el acceso a los datos en las distintas capas. A continuación, vamos a analizar cada una de ellas.

## Configurar un secreto API {#configure-api-secret}

Quizás haya configurado ya un `admin secret` para asegurar la API de GraphQL desde el principio. Esto vendría seguido de un sistema de permisos basado en roles para el acceso a los datos. Pero si utiliza código personalizado a través de `Actions`, `Remote Schemas` y `Events`, entonces necesitará una forma de poder restringir ese código personalizado para que Hasura, y solo Hasura, pueda invocarlo.

Esto requiere de confianza entre el servidor Hasura y el servidor de código personalizado. Esta confianza se establece mediante un secreto API compartido.

Al crear una acción/esquema remoto/evento, puede agregar encabezados personalizados como el que sigue:

![Secreto compartido mediante encabezados](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/shared-secret.png)

## Establecer directivas CORS {#set-cors-policies}

Hasura permite por defecto todas las solicitudes CORS. En escenarios de producción, tal vez quiera restringir las consultas a unos pocos dominios escogidos.

Por ejemplo, si su aplicación está alojada en un dominio, digamos https://example.com, puede permitir que cualquier petición provenga de ahí y de cualquiera de sus subdominios al habilitar la configuración HASURA_GRAPHQL_CORS_DOMAIN="http://*.example.com".

![Dominio Cors](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/cors-domain.png)

Por supuesto, esta restricción solo se aplica del lado del cliente (navegador). En cualquier caso, dado que la API es de acceso público, estas directivas solo son útiles a la hora de restringir las peticiones realizadas desde el navegador. Esto sigue sin impedir que alguien haga peticiones del lado del servidor o de las aplicaciones móviles, por ejemplo, y no debería utilizarse como medio de restricción en esos casos.

## SSL y HTTPS {#ssl-https}

Los proyectos Hasura Cloud vienen con SSL gratuito para todas las aplicaciones, incluidos los dominios personalizados y, por lo tanto, las API son accesibles a través de las consultas regulares `https` y `wss` para las consultas de suscripción en tiempo real.

Tenga en cuenta que `wss` puede utilizarse para realizar todas las peticiones. (No solo suscripciones, sino que también funcionaría con consultas y mutaciones).

## Gestionar a los miembros del equipo y sus niveles de acceso {#manage-team-access}

En Hasura Cloud, puede compartirse el acceso a la consola con los diferentes miembros del equipo con acceso restringido. Esto puede hacerse añadiendo colaboradores en la página de configuración del proyecto, tal y como se indica a continuación:

![Consola del equipo](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/collaborator.png)

Existen dos niveles de acceso al proyecto Hasura Cloud:

- `admin` dispone de acceso para realizar llamadas a la API, consultar las métricas y configurar reglas sin ningún tipo de límite.
- `user` tiene acceso limitado dependiendo de si ha sido provisto de permisos para ejecutar GraphQL y consultar las métricas.

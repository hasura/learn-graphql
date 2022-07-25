---
title: "Nivel de registro"
metaTitle: "Nivel de registro | Tutorial avanzado de Hasura GraphQL"
metaDescription: "El servidor Hasura genera registros estructurados para su API de GraphQL que pueden, además, ser configurados para producir diferentes niveles de registro desde http-log, websocket-log, webhook-log"
---

Anteriormente en el tutorial, ejecutamos una configuración docker-compose para hasura/graphql-engine y postgres. Puede obtenerse acceso a los registros del servidor utilizando el comando `docker logs` seguido del identificador del contenedor de Hasura. Esto generaría los registros de graphql-engine para su instancia local. Si desea depurar un proyecto de Hasura Cloud, puede dirigirse a la pestaña `Pro/Monitoring` en la consola de Hasura.

En esta pestaña obtendrá varias métricas estructuradas del uso de la API. Desde los errores a las conexiones websocket, las consultas pueden inspeccionarse individualmente. A diferencia de la versión de código abierto, la instancia en la nube tendrá una mejor experiencia de usuario en lo que a la inspección de solicitudes individuales respecta.

Todos los tipos de registro están habilitados en Hasura Cloud de forma predeterminada. Si desea desactivar cualquiera de ellos, puede hacerlo configurando la variable ENV `HASURA_GRAPHQL_ENABLED_LOG_TYPES`.

Son configurables:

- http-log
- websocket-log
- webhook-log

Hay un nivel de registro que puede configurarse para especificar cuán explícita ha de ser la información. La jerarquía de nivel de registro es: `debug > info > warn > error`. Puede actualizarse utilizando `HASURA_GRAPHQL_LOG_LEVEL` con el nivel de registro más alto, siendo este `debug`. Combinado con el modo `dev`, nos permitirá saber lo que está fallando en la consulta/controlador subyacente.

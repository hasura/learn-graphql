---
title: "Nivel de registro"
metaTitle: "Nivel de registro | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Hasura salidas de los registros estructurados para su API GraphQL que se pueden configurar para generar diferentes niveles de registro desde http-log, websocket-log, webhook-log"
---

Anteriormente en el tutorial, hemos ejecutado una configuración de composición de docker para hasura/graphql-engine y postgres. Acceder a los registros del servidor se puede hacer usando el `docker logs`comando seguido del id contenedor de Hasura. Esto se produciría los registros de graphql-engine para su instancia local. Si desea depurar un proyecto de nube de Hasura, puede dirigirse a la `Pro/Monitoring`pestaña de la consola de Hasura.

Esta pestaña dará varias métricas estructuradas del uso de la API. A partir de los errores en conexiones de conexión web, las consultas pueden ser inspeccionadas individualmente. A diferencia de la versión de código abierto, la instancia de Cloud tendrá una mejor experiencia de usuario en la inspección de solicitudes individuales.

De forma predeterminada, todos los tipos de registro están habilitados en Hasura Cloud. Si desea deshabilitar cualquiera de ellos, puede hacerlo configurando la variable `HASURA_GRAPHQL_ENABLED_LOG_TYPES`ENV.

Estos son configurables:

- http-log
- websocket-log
- webhook-log

Hay un nivel de registro que se puede configurar para especificar qué tan explícita debe ser la información. La jerarquía de nivel de registro es: `debug > info > warn > error`. Esto se puede actualizar usando `HASURA_GRAPHQL_LOG_LEVEL`el nivel de registro más alto siendo .`debug` Esto junto con el `dev`modo daría información sobre lo que está yendo mal en la consulta / manejador subyacente.

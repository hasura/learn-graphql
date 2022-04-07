---
title: "Seguridad"
metaTitle: "Seguridad | Tutorial avanzado de Hasura GraphQL"
metaDescription: "En esta sección, analizaremos las optimizaciones de seguridad en Hasura. Algunos ajustes podrían estar más abiertos por defecto y, por lo tanto, necesitarán una configuración explícita para garantizar el acceso seguro a los datos."
---

GraphQL se diferencia de REST, fundamentalmente, por la forma en que sirve las API - la API se sirve a través de un único punto de conexión. Esto significa que el filtrado basado en URL no puede aplicarse a las API de GraphQL. Además, las API de REST se basan en métodos de solicitud como GET, POST, PUT y DELETE, mientras que GraphQL suele servirse mediante POST (o websockets, en tiempo real). Los atacantes pueden rastrear el punto de conexión GraphQL (normalmente servido en /graphql) y explotar las consolas de interfaz como GraphiQL si no están protegidos tras auth.

En esta sección, analizaremos las optimizaciones de seguridad en Hasura. Algunos ajustes podrían estar, por defecto, más «abiertos» y, por lo tanto, necesitarán configurarse de forma explícita para garantizar el acceso seguro a los datos.

Se estudiará lo siguiente

- Seguridad de nivel de servicio
- Autenticación y Autorización
- Listas de permitidos
- Limitación de frecuencia
- Limitación de respuestas

y la optimización para cada uno de los casos de uso.

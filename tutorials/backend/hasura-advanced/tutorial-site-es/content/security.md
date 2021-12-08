---
title: "Seguridad"
metaTitle: "Seguridad | Tutorial avanzado de Hasura"
metaDescription: "En esta sección, veremos la optimización de Hasura para la seguridad. De forma predeterminada, algunos ajustes pueden ser más abiertos y, por lo tanto, necesitan una configuración explícita para asegurar el acceso a datos."
---

GraphQL es fundamentalmente diferente de las API REST en la forma en que se sirve - API se sirve en un único punto final. Esto significa que el filtrado basado en URL no se puede aplicar a las API de GraphQL. Las API de REST de Morever dependen de los métodos de solicitud como GET, POST, PUT y DELETE, donde como GraphQL se suele servir a través de POST (o websockets en tiempo real). Los atacantes pueden rastrear el punto final GraphQL (normalmente servido en /graphql) y explotar consolas de interfaz como GraphiQL si no está protegido detrás de aut.

En esta sección, veremos la optimización de Hasura para la seguridad. De forma predeterminada, algunos ajustes pueden ser más "abiertos" y, por lo tanto, necesitan una configuración explícita para asegurar el acceso a datos.

Vamos a mirar lo siguiente

- Seguridad del nivel de servicio
- Autenticación y Autorización
- Permitir listas
- Limitación de tarifas
- Limitación de respuesta

y optimizarse para cada uno de los casos de uso.

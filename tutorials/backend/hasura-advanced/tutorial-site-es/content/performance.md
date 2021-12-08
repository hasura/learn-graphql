---
title: "Rendimiento"
metaTitle: "Performance  de rendimiento Tutorial avanzado de Hasura GraphQL"
metaDescription: "En esta sección, veremos la optimización de Hasura para el rendimiento. En algunos escenarios, el cuello de botella está a nivel de la base de datos. En algunos, está a nivel de infraestructura."
---

En esta sección, veremos la optimización de Hasura para el rendimiento. En algunos escenarios, el cuello de botella está a nivel de la base de datos. En algunos, está a nivel de infraestructura.

Si está a nivel de base de datos, tenemos control total sobre lo que podemos optimizar mientras que Hasura Cloud se encarga de las optimizaciones de infraestructura necesarias para que la aplicación funcione sin problemas.

Vamos a analizar optimizaciones de rendimiento a través de

- Query Caching y Respuesta Caching
- Escalar Postgres con Replicas de lectura
- Escalar Hasura
- Indexes de Postgres usando Explicar/Analizar

---
title: "Rendimiento"
metaTitle: "Rendimiento | Tutorial avanzado de Hasura GraphQL"
metaDescription: "En esta sección, analizaremos la optimización de Hasura para mejorar el rendimiento. En algunos escenarios, el cuello de botella se encuentra a la altura de la base de datos. En otros, lo hace a la de la infraestructura."
---

En esta sección, analizaremos la optimización de Hasura para mejorar el rendimiento. En algunos escenarios, el cuello de botella se encuentra a la altura de la base de datos. En otros, lo hace a la de la infraestructura.

Si se encuentra a la altura de la base de datos tendremos control total sobre lo que podemos optimizar, mientras que Hasura Cloud se encargará de las optimizaciones de la infraestructura, necesarias para que la aplicación se ejecute sin problemas.

Analizaremos las optimizaciones de rendimiento mediante

- Almacenamiento en caché de consultas y respuestas
- Escalado de Postgres con Réplicas de lectura
- Escalado de Hasura
- Índices Postgres utilizando Explain/Analyze

---
title: "Comprobación de estado"
metaTitle: "Comprobación de estado | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Hasura ofrece un punto de conexión de comprobación de estado para supervisar el estado de la API de GraphQL. Está disponible bajo el punto de conexión `/healthz` para todos los proyectos Hasura (incluyendo el motor OSS GraphQL)."
---

Hasura ofrece un punto de conexión de comprobación de estado para supervisar el estado de la API de GraphQL. Está disponible bajo el punto de conexión `/healthz` para todos los proyectos Hasura (incluyendo el motor OSS GraphQL).

Realice una solicitud `GET` al punto de conexión `/healthz` para obtener el estado.

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz
```

Sustituya (advanced-hasura) por el nombre de su proyecto.

El estado podría ser cualquiera de los siguientes:

- `200, OK` - No requiere ninguna acción. Todo funciona según lo previsto.
- `200, WARN, inconsistent objects in schema` - Se han identificado algunos objetos inconsistentes que hacen necesaria una revisión de los metadatos. Suele ocurrir cuando una de las aplicaciones de metadatos tiene objetos erróneos.
- `500, ERROR` - Esto significa que la API no está funcionando y hay que revisar los registros.

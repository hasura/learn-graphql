---
title: "Cheque de salud"
metaTitle: "Check  Tutorial avanzado de Hasura GraphQL."
metaDescription: "Hasura da un punto de referencia de control de salud para monitorear el estado de la API GraphQL. Esto está disponible bajo `/healthz` endpoint para todos los proyectos de Hasura (incluido el motor OSS GraphQL)."
---

Hasura da un punto de referencia de control de salud para monitorear el estado de la API GraphQL. Esto está disponible en punto `/healthz`final para todos los proyectos de Hasura (incluido el motor OSS GraphQL).

Haga una `GET`solicitud al punto `/healthz`final para obtener el estado.

```bash
curl -XGET https://advanced-hasura.hasura.app/healthz
```

Sustituya (advanced-hasura) con el nombre de tu proyecto.

El estado podría ser uno de los siguientes:

- `200, OK`- Esto no requiere acción. Todo está funcionando como se esperaba.
- `200, WARN, inconsistent objects in schema`- Esto requiere una revisión de los metadatos ya que se han identificado algunos objetos inconsistentes. Por lo general, ocurre cuando hay un metadatos que tenía los objetos equivocados.
- `500, ERROR`- Esto significa que la API no está funcionando y los registros deben ser comprobados.

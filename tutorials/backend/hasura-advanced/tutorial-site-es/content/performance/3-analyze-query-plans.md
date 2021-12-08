---
title: "Análisis de planes de consulta"
metaTitle: "Análisis de los planes de consulta | Hasura GraphQL Tutorial avanzado"
metaDescription: "Postgres tiene grandes herramientas para entender lo lento que se ejecuta una consulta. Puede ejecutar una simple instrucción SQL usando `EXPLAIN` para preguntar a la base de datos por qué una consulta en particular tarda mucho tiempo."
---

Postgres tiene grandes herramientas para entender lo lento que se ejecuta una consulta. Puede ejecutar una simple instrucción SQL usando para preguntar a la base `EXPLAIN`de datos por qué una consulta en particular tarda mucho tiempo. Por ejemplo, en nuestro modelo de slack, podemos hacer la siguiente consulta en la `SQL`pestaña de la `Data`página de la consola:

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

`Total Cost`La anterior devolvería una `JSON`respuesta con datos para , , `Planning Time``Execution Time`etc. entre otras métricas. Estas métricas son útiles para entender cuánto tiempo se está llevando una consulta y qué partes optimizar. Por ejemplo, esto devolvió un tipo de plan (Escaneo `Seq Scan`Secuencial) y para grandes conjuntos de datos esto podría ser relativamente lento.

## Indexes PostgreSQL

Los índices de postgres son una forma de aumentar el rendimiento en una columna que se consulta con frecuencia. El concepto es similar al de un índice en un libro. Ayuda a acceder a los datos que está buscando más rápidamente manteniendo metadatos adicionales.

Digamos que la base de datos recibe un gran número de solicitudes para seleccionar canales que se consultan por su nombre, por ejemplo:

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

En el Explorador de API, haga la siguiente consulta

```graphql
query {
    channel {
        id
        name
    }
}
```

y haga clic en el `Analyze`botón.

![Explicar/analizar](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

Puede notar que hay una exploración secuencial. Esto podría ser más lento si hay muchos registros en la base de datos.

Ahora podemos crear un índice en la columna de nombre de la tabla de canales:

Dirígete a la pestaña Datos de la Consola de Hasura y vuelve a navegar a la `SQL`pestaña de nuevo.

Ejecute la siguiente declaración:

```sql
CREATE INDEX channel_name_index ON channel (name);
```

Dado que la base de datos es capaz de buscar el resultado de estas consultas más rápidamente, el rendimiento de estas consultas aumentará significativamente.

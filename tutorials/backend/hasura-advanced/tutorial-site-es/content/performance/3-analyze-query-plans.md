---
title: "Análisis de planes de consulta"
metaTitle: "Análisis de planes de consulta | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Postgres cuenta con grandes herramientas para analizar la lentitud con la que se ejecutan las consultas. Puede ejecutar una simple instrucción SQL utilizando `EXPLAIN` para preguntar a la base de datos por qué se demora una consulta en concreto."
---

Postgres cuenta con grandes herramientas para analizar la lentitud con la que se ejecutan las consultas. Puede ejecutar una instrucción SQL sencilla, utilizando `EXPLAIN`, para preguntar a la base de datos por qué se demora una consulta en concreto. Por ejemplo, en nuestro modelo de slack, podemos realizar la siguiente consulta en la pestaña `SQL` de la página `Data` de la consola:

```sql
EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS)
SELECT *
FROM channel
WHERE name = 'daily-standup';
```

La consulta anterior devolvería una respuesta `JSON` con datos para `Total Cost`, `Planning Time`, `Execution Time`, etc, entre otras métricas. Estas métricas son útiles para comprender cuánto tiempo lleva una consulta y qué partes han de optimizarse. Por ejemplo, esto devolvió un tipo de plan `Seq Scan` (Escaneo secuencial), lo que podría resultar relativamente más lento para los conjuntos de datos de mayor tamaño.

## Índices PostgreSQL {#postgresql-indexes}

Los índices de Postgres son una forma de aumentar el rendimiento en columnas que se consultan con frecuencia. El concepto es similar al del índice en un libro. Ayuda a acceder a los datos buscados más rápidamente al disponer de metadatos adicionales.

Supongamos que la base de datos recibe un gran número de solicitudes de selección de canales, consultados por nombre, por ejemplo:

```sql
SELECT * FROM channel WHERE name = 'daily-standup';
```

En el Explorador de la API, realice la siguiente consulta

```graphql
query {
    channel {
        id
        name
    }
}
```

y haga clic en el botón `Analyze`.

![Explain/Analyze](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/explain-analyze.png)

Podrá observar que hay un Escaneo secuencial. Esto podría volverse más lento si hay muchos registros en la base de datos.

Ahora podremos crear un índice en la columna nombre de la tabla de canales:

Diríjase a la pestaña Datos de Hasura Console y vuelva hasta la pestaña `SQL`.

Ejecute la siguiente instrucción:

```sql
CREATE INDEX channel_name_index ON channel (name);
```

Dado que la base de datos puede ahora buscar el resultado de estas consultas con mayor rapidez, el rendimiento de las mismas aumentará de forma significativa.

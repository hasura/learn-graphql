---
title: "Hasura CLI"
metaTitle: "H Tutorial avanzado de Hasura"
metaDescription: "Hasura CLI se encargará de gestionar el proyecto a nivel local. Empieza con una carpeta vacía y ejecuta el siguiente comando"
---

## Instalar Hasura CLI

Dependiendo de la plataforma, [instale Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html) siguiendo los pasos en docs.

Hasura CLI se encargará de gestionar el proyecto a nivel local. Inicie con una carpeta vacía y ejecute el siguiente comando:

```bash
hasura init
```

Esto creará una nueva estructura de proyecto localmente bajo el directorio dado `hasura`(por defecto). Así es como se ve la estructura de directorio:

```
├── config.yaml
├── metadata
│   ├── actions.graphql
│   ├── actions.yaml
│   ├── allow_list.yaml
│   ├── cron_triggers.yaml
│   ├── databases
│   │   └── databases.yaml
│   ├── query_collections.yaml
│   ├── remote_schemas.yaml
│   └── version.yaml
├── migrations
└── seeds
```

Los `seeds`directorios `migrations`están initally vacíos. El `metadata`directorio contiene un montón de archivos yaml que describen cada uno diferentes partes de la API GraphQL, como las acciones, esquemas remotos y las diferentes bases de datos que están conectados a este proyecto junto con sus tablas y funciones, etc.

Ya que Hasura está corriendo localmente a través de docker-compose, ejecute el siguiente comando

```bash
hasura console
```

`http://localhost:9695`Esto debe abrir la consola y es la misma interfaz gráfica que la que ve en la consola de servidor en`http://localhost:8080`

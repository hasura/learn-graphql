---
title: "Hasura CLI"
metaTitle: "Hasura CLI | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Utilizaremos Hasura CLI para gestionar el proyecto de forma local. Comience con una carpeta vacía y ejecute el siguiente comando"
---

## Instalar Hasura CLI {#install-hasura-cli}

Dependiendo de la plataforma, [instale Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/) siguiendo los pasos en la documentación.

Utilizaremos Hasura CLI para gestionar el proyecto de forma local. Comience con una carpeta vacía y ejecute el siguiente comando:

```bash
hasura init
```

Esto creará, de forma local, una nueva estructura de proyecto en el directorio especificado (`hasura`, por defecto). Este es el aspecto de la estructura del directorio:

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

Los directorios `migrations` y `seeds` aparecen vacíos inicialmente. El directorio `metadata` contiene unos cuantos archivos yaml, cada uno de los cuales describe distintas partes de la API de GraphQL, como las acciones, los esquemas remotos y las diferentes bases de datos conectadas al proyecto, junto con sus tablas, funciones, etc.

Como ejecuta Hasura de forma local a través de docker-compose, ejecute el siguiente comando

```bash
hasura console
```

La consola debería abrirse en `http://localhost:9695` y la interfaz gráfica de usuario es la misma que puede ver en la consola del servidor en `http://localhost:8080`

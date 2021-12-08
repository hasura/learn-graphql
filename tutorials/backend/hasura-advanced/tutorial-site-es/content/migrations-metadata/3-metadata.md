---
title: "Gestión de metadatos"
metaTitle: "Gestión de metadatos | Tutorial avanzado de Hasura"
metaDescription: "Además de gestionar archivos de migración, Hasura tiene metadatos que deben mantenerse y controlar la versión también."
---

Además de gestionar archivos de migración, Hasura tiene metadatos que deben mantenerse y controlar la versión también. Los archivos de migración se crean principalmente para acciones realizadas para actualizar el `database schema`. Por otro lado, los archivos de metadatos se actualizan cada vez que se realiza una acción en la consola, como rastrear tablas / vistas/funciones, crear relaciones, configurar permisos, crear disparadores de eventos y esquemas remotos, etc. se pueden exportar como un archivo de metadatos JSON/yaml que se puede controlar la versión.

El archivo de metadatos se puede importar posteriormente a otra instancia de Hasura para obtener la misma configuración (siempre que exista el esquema de la base de datos). También puede editar manualmente el archivo de metadatos para agregar más objetos a él y luego usarlo para actualizar la instancia.

En la pestaña Datos de la consola, haga clic en `Track All`para seguir todas las tablas y luego sus relaciones también.

Los metadatos se pueden exportar con el siguiente comando:

```bash
hasura metadata export
```

Esto exportará los metadatos como yaml y actualizará los archivos correctos en el `metadata`directorio.

```bash
├── actions.graphql
├── actions.yaml
├── allow_list.yaml
├── cron_triggers.yaml
├── databases
│   ├── databases.yaml
│   └── default
│       ├── functions
│       │   └── functions.yaml
│       └── tables
│           ├── public_channel.yaml
│           ├── public_channel_member.yaml
│           ├── public_channel_thread.yaml
│           ├── public_channel_thread_message.yaml
│           ├── public_online_users.yaml
│           ├── public_user_message.yaml
│           ├── public_users.yaml
│           ├── public_workspace.yaml
│           ├── public_workspace_member.yaml
│           ├── public_workspace_user_type.yaml
│           └── tables.yaml
├── inherited_roles.yaml
├── query_collections.yaml
├── remote_schemas.yaml
├── rest_endpoints.yaml
└── version.yaml
```

- `actions.graphql`- Este archivo contiene los tipos GraphQL definidos para las Acciones. Tenga en cuenta que los tipos pueden compartir entre Acciones y esta sería la única fuente de la verdad.
- `actions.yaml`- Contiene la definición de acción como la consulta/mutación y la configuración del controlador.
- `allow_list.yaml`- Contiene la configuración para Permitir listas para restringir las consultas realizadas al servidor.
- `cron_triggers.yaml`- Contiene metadatos sobre los disparos programados creados.
- `databases`- Este es un directorio que contiene todas las bases de datos conectadas para este proyecto.
   - `functions`- Esto contiene las funciones de Postgres a rastrear.
   - `tables`- Todas las tablas postgres y vistas que necesitan ser expuestas a través de GraphQL junto con su información de permisos.
- `inherited_roles.yaml`- Esto contiene la definición de todos los roles heredados.
- `query_collections.yaml`- Las consultas se pueden agrupar dentro de una colección. Este archivo contiene estos grupos.
- `remote_schemas.yaml`- Metadatos sobre todos los esquemas remotos añadidos incluyendo información sobre el punto final GraphQL y encabezados opcionales.
- `rest_endpoints.yaml`- Metadatos de todos los puntos finales RESTified que se crean para una consulta GraphQL dada.
- `version.yaml`- Versión de los metadatos que se están utilizando. Actualmente es la versión 3.

En nuestro esquema de slack, tenemos el `tables`directorio rellenado con todas las tablas de postgres y los permisos basados en el rol para el mismo. A medida que seguimos cambiando el esquema y modificando los metadatos relacionados con él, estos archivos se actualizarían automáticamente.

## Importar/Exportar metadatos desde la consola

La página Configuración de la consola de Hasura tiene la opción de importar y exportar metadatos en formato `.json`rápido.

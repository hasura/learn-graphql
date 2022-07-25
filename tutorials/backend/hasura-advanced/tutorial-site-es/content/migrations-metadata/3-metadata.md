---
title: "Gestión de metadatos"
metaTitle: "Gestión de metadatos | Tutorial avanzado de Hasura GraphQL"
metaDescription: "Además de gestionar los archivos de migración, Hasura tiene metadatos que deben mantenerse y cuya versión ha de ser controlada."
---

Además de gestionar los archivos de migración, Hasura tiene metadatos que deben mantenerse y cuya versión ha de ser controlada. Los archivos de migración se crean principalmente para las acciones tomadas con la intención de actualizar el `database schema`. Por otro lado, los archivos de metadatos se actualizan cada vez que se realiza una acción en la consola, como el seguimiento de tablas/vistas/funciones, la creación de relaciones, la configuración de permisos, la creación de desencadenadores de eventos y esquemas remotos, etc. y pueden ser exportados como archivo de metadatos JSON/yaml con control de versiones.

El archivo de metadatos puede importarse más adelante a otra instancia de Hasura para obtener la misma configuración (siempre y cuando exista el esquema de la base de datos). También puede editar manualmente el archivo de metadatos, para agregarle más objetos y luego utilizarlo para actualizar la instancia.

En la pestaña Datos de la consola, haga clic en `Track All` para realizar un seguimiento de todas las tablas y, más tarde, también de sus relaciones.

Los metadatos pueden exportarse con el siguiente comando:

```bash
hasura metadata export
```

Esto exportará los metadatos como archivo yaml y actualizará los archivos correctos en el directorio `metadata`.

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

- `actions.graphql` - Este archivo contiene los tipos de GraphQL definidos para las Acciones. Tenga en cuenta que los tipos pueden ser compartidos entre Acciones y que esta sería la única fuente de verdad.
- `actions.yaml` - Contiene la definición de la acción, al igual que la consulta/mutación y la configuración del controlador.
- `allow_list.yaml` - Contiene la configuración de las Listas de permisos para limitar las consultas realizadas al servidor.
- `cron_triggers.yaml` - Contiene metadatos sobre los Desencadenadores programados creados.
- `databases` - Este directorio contiene todas las bases de datos conectadas para este proyecto.
   - `functions` - Contiene las funciones de Postgres a seguir.
   - `tables` - Todas las tablas y vistas de Postgres que han de ser expuestas sobre GraphQL junto con la información de sus permisos.
- `inherited_roles.yaml` - Contiene la definición de todos los roles heredados.
- `query_collections.yaml` - Las consultas pueden agruparse dentro de una colección. Este archivo contiene ese tipo de grupos.
- `remote_schemas.yaml` - Metadatos sobre todos los Esquemas remotos añadidos, incluyendo información sobre el punto de conexión de GraphQL y los encabezados opcionales.
- `rest_endpoints.yaml` - Metadatos de todos los puntos de conexión RESTified creados para cualquier consulta GraphQL.
- `version.yaml` - Versión de los metadatos utilizados. Actualmente se trata de la versión 3.

En nuestro esquema de slack, el directorio `tables` está poblado con todas las tablas de postgres y sus permisos basados en roles. A medida que vayamos cambiando el esquema y modificando los metadatos relacionados, estos archivos se actualizarán automáticamente.

## Importar/exportar metadatos desde la consola {#import-export-metadata}

La página de Configuración de la consola Hasura cuenta con la opción de importar/exportar metadatos rápidamente en formato `.json`.

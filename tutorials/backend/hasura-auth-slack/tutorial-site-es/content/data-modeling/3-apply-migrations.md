---
title: "Aplicar Migraciones"
metaTitle: "Aplicar Migraciones | Tutorial de Slack de autenticación de Hasura"
metaDescription: "Se aplican las migraciones de hasura para la creación de tablas y relaciones"
---

Empecemos por crear las tablas y las relaciones para la aplicación de Slack.

## Descargue el proyecto de Hasura con migraciones {#download}

1. Clone el repositorio de [learn-graphql](https://github.com/hasura/learn-graphql). Ejecute los siguientes comandos en el terminal:

```bash
# make sure git version is >= v2.26

git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/backend/hasura-auth-slack/slack-backend
```

2. Desplácese hasta el directorio `slack-backend`.

```bash
cd tutorials/backend/hasura-auth-slack/slack-backend
```

Configure el punto de conexión para que apunte a la URL de la aplicación de Hasura Cloud. Abra el archivo `config.yaml` y establezca el valor de punto de conexión.

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**Nota:** el punto de conexión será diferente en función del proyecto de Hasura.

Ahora vamos a aplicar las migraciones.

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

Esto creará las tablas y las relaciones para la aplicación de slack.

¡Genial! Ahora desplácese hasta la consola de Hasura para ver las tablas con las relaciones.

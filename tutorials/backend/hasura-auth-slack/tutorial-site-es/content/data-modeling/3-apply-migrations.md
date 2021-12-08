---
title: "Aplicar Migraciones"
metaTitle: "Aplicar Migraciones | Tutorial de la carencia de Hasura"
metaDescription: "hasura migrate aplicar para crear tablas y relaciones"
---

Vamos a empezar creando las tablas y las relaciones para la aplicación Slack .

## Descargar el proyecto hasura con migraciones

1. Clonar la [repo.](https://github.com/hasura/learn-graphql) Ejecute los siguientes comandos en su terminal:

```bash
git clone --filter=blob:none --sparse git@github.com:hasura/learn-graphql.git

cd learn-graphql

git sparse-checkout init --cone

git sparse-checkout add tutorials/backend/hasura-auth-slack/slack-backend
```

2. Vaya al `slack-backend`directorio.

```bash
cd tutorials/backend/hasura-auth-slack/slack-backend
```

Configure el punto final para apuntar a la URL de la aplicación Hasura Cloud. Abra el `config.yaml`archivo y establezca el valor de endpoint.

```yaml
version: 3
endpoint: https://ready-panda-91.hasura.app
...
```

**Nota:** Su punto final será diferente según su proyecto Hasura.

Ahora vamos a aplicar las migraciones.

```bash
hasura metadata apply --admin-secret xxxx
hasura migrate apply --admin-secret xxxx
hasura metadata reload --admin-secret xxxx
```

Esto creará las tablas y las relaciones para la aplicación slack.

¡Genial! Ahora navega hasta la Consola de Hasura para ver las tablas con relaciones.

---
title: "Entornos de desarrollo"
metaTitle: "Entornos de desarrollo | Tutorial avanzado de Hasura GraphQL"
metaDescription:
  "Hasura puede utilizarse en diferentes entornos, desde el desarrollo local hasta los ensayos y la producción, con el
  uso de migraciones y metadatos."
---

## Desarrollo local {#local-development}

La instancia Hasura ejecutada de forma local en su máquina con docker-compose actúa como configuración del entorno de
desarrollo. Hasura CLI puede utilizarse para ayudar a la consola con la gestión automática de las migraciones y los
metadatos.

## Entorno de ensayo {#staging-environment}

Ahora vamos a crear un entorno de ensayo y a tratar de replicar el esquema y los metadatos que tenemos en nuestra
configuración local de desarrollo.

Vamos a utilizar Hasura Cloud para el entorno de ensayo. [Hasura Cloud](https://hasura.io/cloud/) le ofrece una API de
GraphQL escalable, altamente disponible, distribuida a nivel global, totalmente gestionada y segura como servicio.

Haga clic en el siguiente botón para crear un nuevo proyecto en Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

Una vez se registre e inicie sesión, debería ver la siguiente pantalla de bienvenida y se creará un nuevo proyecto de
Hasura automáticamente para usted:

![Página de bienvenida de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Una vez que se inicie el proyecto, puede hacer clic en el botón `Launch Console` en la ventana emergente. Si ya dispone
de una cuenta de Hasura Cloud, puede crear un nuevo proyecto haciendo clic en la acción `+ New Project` en la parte
superior y luego en `Launch Console`.

## Consola de Hasura {#hasura-console}

Esto abrirá la consola de Hasura para el proyecto. Debería parecerse a esto:

![Consola de Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

El siguiente paso es conectar la base de datos a Hasura. Para configurarla, podemos hacer uso del nivel de base de datos
Postgres gratuito de Heroku. Diríjase a la pestaña `Data` en la consola y haga clic en `Connect Database`.

Tenemos dos opciones para conectar una base de datos:

- Conectar una base de datos existente
- Crear la base de datos de Heroku (gratis)

Para iniciar este proceso, vamos a crear una nueva base de datos de Postgres desde cero utilizando Heroku Postgres. Haga
clic en la pestaña `Create Heroku Database (Free)`. En esta pestaña, dispondrá ahora de una opción para hacer clic en el
botón `Create Database`. Tenga en cuenta que crear una cuenta en Heroku es gratis.

![Cree la base de datos de Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Después de iniciar sesión en Heroku y hacer clic en `Create Database`, Hasura Cloud realizará lo siguiente para usted:

- Crear una aplicación en Heroku
- Instalar el complemento de Postgres
- Buscar la URL de la base de datos con la que configurar Hasura

![Configuración de Heroku de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Se necesitarán unos segundos para conectarse a Heroku Postgres e inicializar. Una vez establecida la conexión, se le
llevará a la página del Gestor de datos en la Consola, que enumera la base de datos que acabamos de conectar.

Ahora, copie la URL del proyecto que se parece a `https://myproject.hasura.app`, (sustituya `myproject` por el nombre de
su proyecto Hasura).

Vuelva al terminal, y al directorio del proyecto Hasura. Ejecute el siguiente comando:

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

A continuación, pruebe a refrescar la Consola Hasura en el proyecto Cloud y compruebe si el esquema de la base de datos
aparece reflejado. Básicamente, hemos replicado el esquema y los metadatos en una nueva instancia de Hasura y una nueva
base de datos Postgres.

A medida que vayamos cambiando el esquema de forma local, podemos seguir aplicando los dos comandos anteriores para
aplicar los mismos cambios al entorno de ensayo.

**Nota**: puede también crear un proyecto en Hasura Cloud para su desarrollo. Todos los pasos necesarios para
sincronizar entre desarrollo y ensayo continuarían sin cambios. Normalmente, los controladores de las URL de webhook han
de ser expuestos a un punto de conexión público al que pueda acceder Hasura Cloud y, por lo tanto, no pueden ser urls
`localhost`. Recomendamos utilizar algo como `ngrok` para exponer al servidor local que se ejecute para
Acciones/Esquemas remotos/Eventos a un punto de conexión de acceso público.

## Aplastar migraciones {#squashing-migrations}

A medida que vamos cambiando la base de datos, el directorio de migración se llena de «ruido» a causa de todas los
archivos creados durante el proceso de iteración del desarrollo. Una vez se ha fijado una característica, es posible que
quiera combinarla y «aplastar» todos los archivos de migración relacionados con ella dentro de un único archivo. Puede
lograrse utilizando el comando squash de Hasura CLI. Ejecute el siguiente comando:

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

y reemplace el valor por `--from` a tal efecto.

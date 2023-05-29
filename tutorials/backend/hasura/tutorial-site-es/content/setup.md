---
title: "Despliegue de Hasura"
metaTitle: "Despliegue de Hasura en Hasura Cloud | Tutorial de GraphQL de Hasura"
metaDescription:
  "Este tutorial cubre cómo implementar el motor de GraphQL de Hasura en Hasura Cloud utilizando el despliegue de un
  solo clic y el acceso a la Consola de Hasura"
---

Empecemos por desplegar Hasura.

## Despliegue de un clic en Hasura Cloud {#one-click-deployment}

La manera más rápida de probar Hasura es a través de Hasura Cloud. ¡[Hasura Cloud](https://hasura.io/cloud/) le ofrece
una API de GraphQL escalable, altamente disponible, distribuida mundialmente, totalmente gestionada y segura como
servicio!

Haga clic en el siguiente botón para crear un nuevo proyecto en Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default&skip_onboarding=true" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**Nota**: inscribirse es gratis y no se requiere tarjeta de crédito.

Una vez que se registre e inicie sesión, debería ver la siguiente pantalla de bienvenida y se creará automáticamente un
nuevo proyecto de Hasura para usted:

![Página de bienvenida de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Una vez que se inicie el proyecto, puede hacer clic en el botón `Launch Console` en la ventana emergente. Si ya tenía
una cuenta de Hasura Cloud, puede crear un nuevo proyecto haciendo clic en la acción `+ New Project` en la parte
superior y luego en `Launch Console`.

## Consola de Hasura {#hasura-console}

Esto abrirá la consola de Hasura para el proyecto. Debería parecerse a esto:

![Consola de Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

El siguiente paso es conectar la base de datos a Hasura. Podemos hacer uso del nivel de la
[base de datos de Postgres](https://hasura.io/learn/database/postgresql/what-is-postgresql/) gratuita de Heroku para
configurar esto. Diríjase a la pestaña `Data` en la consola y haga clic en `Connect Database`.

Tenemos dos opciones para conectar una base de datos:

- Conecte una base de datos existente
- Cree la base de datos de Heroku (gratis)

Para iniciar este proceso, vamos a crear una nueva base de datos de Postgres desde cero utilizando Heroku Postgres. Haga
clic en la pestaña `Create Heroku Database (Free)`. En esta pestaña, ahora tiene una opción para hacer clic en el botón
`Create Database`. Tenga en cuenta que crear una cuenta en Heroku es gratis.

![Cree la base de datos de Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

Después de iniciar sesión en Heroku y hacer clic en `Create Database`, Hasura Cloud realizará lo siguiente para usted:

- Crear una aplicación en Heroku
- [Instalar el complemento de Postgres](https://hasura.io/learn/database/postgresql/installation/installing-postgresql/)
- Buscar la URL de la base de datos que puede utilizar para configurar Hasura

![Configuración de Heroku de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Se necesitarán unos segundos para conectarse a Heroku Postgres e inicializar. Una vez que se establezca la conexión, se
le llevará a la página del gestor de datos en la consola, que enumera la base de datos que acabamos de conectar.

También puede gestionar el proyecto desde el panel de control de Hasura Cloud.

![Página del proyecto de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

¡Genial! ¡Ahora ha desplegado Hasura, conectado una base de datos y tiene la consola de administrador lista para
empezar!

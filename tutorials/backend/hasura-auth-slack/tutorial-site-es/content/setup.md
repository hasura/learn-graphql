---
title: "Despliegue Hasura"
metaTitle: "Despliegue de Hasura en la nube de Hasura | Hasura Tutorial de la carencia"
metaDescription: "Este tutorial cubre cómo implementar Hasura GraphQL Engine en Hasura Cloud mediante una implementación de un solo clic y acceder a la Consola de Hasura"
---

Empecemos por desplegar Hasura.

## Implementación con un clic en Hasura Cloud

La forma más rápida de probar Hasura es a través de Hasura Cloud. [Hasura Cloud](https://hasura.io/cloud/) le ofrece una API de GraphQL escalable, altamente disponible, distribuida a nivel mundial, totalmente gestionada, segura como servicio.

Haga clic en el botón siguiente para crear un nuevo proyecto en Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

**Nota**: Es gratis registrarse y no se requiere tarjeta de crédito.

Una vez que se registre y se registre en la pantalla de bienvenida y se creará automáticamente un nuevo proyecto de Hasura:

![Página de Bienvenida de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Una vez que el proyecto se inicie, puede hacer clic en el `Launch Console`botón en la pantalla emergente. Si ya tiene una cuenta de Hasura Cloud antes, puede crear manualmente un nuevo proyecto haciendo clic en la `+ New Project`acción en la parte superior, seguido de .`Launch Console`

## Consola Hasura

Esto abrirá Hasura Console para su proyecto. Debe parecer algo como esto:

![Consola Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

El siguiente paso es conectar la base de datos a Hasura. Podemos hacer uso del nivel de [base](https://hasura.io/learn/database/postgresql/what-is-postgresql/) de datos de Postgres gratuito de Heroku para configurarlo. Vaya a la `Data`pestaña de la Consola y haga clic en .`Connect Database`

Tenemos dos opciones para conectar una base de datos:

- Conectar una base de datos existente
- Crear una base de datos de Heroku (gratis)

Para iniciar este proceso, vamos a crear un nuevo Postgres DB desde cero usando Heroku Postgres. Haga clic en la `Create Heroku Database (Free)`pestaña En esta pestaña, ahora tiene la opción de hacer clic en el `Create Database`botón. Tenga en cuenta que es libre de crear una cuenta en Heroku.

![Crear una base de datos de Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

`Create Database`Después de iniciar sesión en Heroku y hacer clic en , Hasura Cloud realizará lo siguiente para usted:

- Crear una aplicación en Heroku
- [Instalar Postgres](https://hasura.io/learn/database/postgresql/installation/installing-postgresql/) Add-on
- Fetch base de datos URL que puede utilizar para configurar Hasura

![Configuración de Hasura Cloud Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Se necesitará unos segundos para conectarse a Heroku Postgres e inicializarse. Una vez que se establezca la conexión, se le llevará a la página del Administrador de datos en la consola, listando la base de datos que acabamos de conectar.

También puede gestionar el proyecto desde el panel de control de la nube de Hasura.

![Página de proyecto de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-project-page.png)

¡Genial! Ahora ha implementado Hasura, conectado una base de datos y tiene la consola de administración lista para comenzar!

---
title: "Ambientes Dev"
metaTitle: "Entornos de Dev | Tutorial avanzado de Hasura"
metaDescription: "Hasura puede ser utilizado en diferentes ambientes a partir del desarrollo local, la puesta en escena y la producción con el uso de migraciones y metadatos."
---

## Desarrollo Local

La instancia de Hasura que se ejecuta localmente en su máquina con docker-compose es la configuración del entorno de dev. El CLI Hasura se puede utilizar para servir la consola para la gestión automática de migraciones y metadatos.

## Entorno de escenario

Ahora vamos a crear un entorno de puesta en escena e intentar replicar el esquema y los metadatos que tenemos en nuestra configuración de dev local.

Vamos a hacer uso de Hasura Cloud para el entorno de estadio. [Hasura Cloud](https://hasura.io/cloud/) le ofrece una API de GraphQL escalable, altamente disponible, distribuida a nivel mundial, totalmente gestionada, segura como servicio.

Haga clic en el botón siguiente para crear un nuevo proyecto en Hasura Cloud:

<a href="https://cloud.hasura.io/?pg=learn-hasura-backend&plcmt=body&tech=default" target="_blank"><img src="https://graphql-engine-cdn.hasura.io/assets/main-site/deploy-hasura-cloud.png" /></a>

Una vez que se registre y se registre en la pantalla de bienvenida y se creará automáticamente un nuevo proyecto de Hasura:

![Página de Bienvenida de Hasura Cloud](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-welcome.png)

Una vez que el proyecto se inicie, puede hacer clic en el `Launch Console`botón en la pantalla emergente. Si ya tiene una cuenta de Hasura Cloud antes, puede crear manualmente un nuevo proyecto haciendo clic en la `+ New Project`acción en la parte superior, seguido de .`Launch Console`

## Consola Hasura

Esto abrirá Hasura Console para su proyecto. Debe parecer algo como esto:

![Consola Hasura](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-console.png)

El siguiente paso es conectar la base de datos a Hasura. Podemos hacer uso del nivel de base de datos de Postgres gratuito de Heroku para configurarlo. Vaya a la `Data`pestaña de la Consola y haga clic en .`Connect Database`

Tenemos dos opciones para conectar una base de datos:

- Conectar una base de datos existente
- Crear una base de datos de Heroku (gratis)

Para iniciar este proceso, vamos a crear un nuevo Postgres DB desde cero usando Heroku Postgres. Haga clic en la `Create Heroku Database (Free)`pestaña En esta pestaña, ahora tiene la opción de hacer clic en el `Create Database`botón. Tenga en cuenta que es libre de crear una cuenta en Heroku.

![Crear una base de datos de Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/create-heroku-database.png)

`Create Database`Después de iniciar sesión en Heroku y hacer clic en , Hasura Cloud realizará lo siguiente para usted:

- Crear una aplicación en Heroku
- Instalar Postgres Add-on
- Fetch base de datos URL que puede utilizar para configurar Hasura

![Configuración de Hasura Cloud Heroku](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/hasura-cloud-heroku-setup.png)

Se necesitará unos segundos para conectarse a Heroku Postgres e inicializarse. Una vez que se establezca la conexión, se le llevará a la página del Administrador de datos en la consola, listando la base de datos que acabamos de conectar.

Ahora copie la URL del proyecto que se vea `https://myproject.hasura.app`parecida . (reemplace `myproject`con el nombre del proyecto hasura).

Vuelva a la terminal, en el directorio del proyecto Hasura. Ejecute el siguiente comando:

```bash
hasura migrate apply --endpoint https://myproject.hasura.app --admin-secret xxxxx --database-name default
hasura metadata apply --endpoint https://myproject.hasura.app --admin-secret xxxxx
```

Ahora, intente refrescar la Consola Hasura en el proyecto de Cloud y vea si el esquema de base de datos está reflejando allí. Esencialmente hemos replicado el esquema y los metadatos en una nueva instancia de Hasura y nueva base de datos de Postgres.

A medida que seguimos cambiando el esquema localmente, podemos seguir aplicando los dos comandos anteriores para aplicar los mismos cambios en el entorno de estadificación.

**Nota**: También puede crear un proyecto en Hasura Cloud para el desarrollo. Todos los pasos necesarios para sincronizar entre dev y staging seguirán siendo los mismos. Normalmente, los manejadores de URL de webhook necesitan estar expuestos a un punto final público al que Hasura Cloud puede acceder y por lo tanto no pueden ser `localhost`urls. Recomendamos usar algo como `ngrok`para exponer un servidor local que se ejecuta para Acciones/Esquemas Remotos / Eventos a un punto final de acceso público.

## Eliminación de las migraciones

A medida que seguimos cambiando la base de datos, el directorio de migración se vuelve ruidoso con demasiados archivos creados en el proceso de iteración de dev. Una vez que se ha corregido una función, es posible que desee combinar y eliminar todos los archivos de migración relacionados con ella en un solo archivo. Esto se puede lograr utilizando el comando squash del CLI Hasura. Ejecute el siguiente comando:

```bash
hasura migrate squash --name "squashed-migration" --from 123 --database-name default --endpoint https://myproject.hasura.app
```

y sustituir el valor por `--from`apropiadamente.

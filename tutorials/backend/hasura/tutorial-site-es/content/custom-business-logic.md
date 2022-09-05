---
title: "Lógica de negocios personalizada"
metaTitle: "Logica de negocios personalizada | Tutorial de GraphQL de Hasura"
metaDescription: "La lógica de negocios personalizada puede gestionarse de dos maneras utilizando Hasura. Una de ellas es escribiendo resoluciones de GraphQL personalizadas y agregándolas como esquema remoto y otra es desencadenando un webhook de forma asincrónica después de una mutación."
---

Hasura le ofrece las API de GraphQL en tiempo real + CRUD con control de acceso y autorización. Sin embargo, hay casos en los que buscaría agregar lógica de negocios/personalizada en la aplicación. Por ejemplo, en la aplicación de tareas pendientes que estamos construyendo, antes de insertar las tareas pendientes en la fuente pública queremos validar si el texto tiene palabrotas.

La lógica de negocios personalizada puede gestionarse de varias maneras flexibles en Hasura:

Acciones (recomendadas) {#actions}
---------------------

[Las acciones](https://hasura.io/docs/latest/graphql/core/actions/index/) son una manera de extender el esquema de Hasura con lógica de negocios personalizada utilizando mutaciones y consultas personalizadas. Pueden agregarse acciones a Hasura para gestionar varios casos de uso, como validación de datos, enriquecimiento de datos de fuentes externas y cualquier otra lógica de negocios compleja.

![Arquitectura de acciones](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/actions-architecture.png)

Las acciones pueden ser una consulta o una mutación.

- `Query Action` - Si está consultando algunos datos de una API externa o haciendo algunas validaciones/transformaciones antes de devolver los datos, puede utilizar una acción de consulta.
- `Mutation Action` - Si busca realizar validaciones de datos o hacer alguna lógica personalizada antes de manipular la base de datos, puede utilizar una acción de mutación.

Esquemas remotos {#remote-schemas}
--------------

Hasura tiene la capacidad de fusionar esquemas de GraphQL remotos y proporcionar una API de GraphQL unificada. Piense en ello como costuras de esquema automatizadas. De esta manera, podemos escribir resoluciones de GraphQL personalizadas y agregarlas como esquema remoto.

![Arquitectura de esquema remoto](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura/remote-schema-architecture.png)

Si está eligiendo entre acciones y esquemas remotos, aquí hay algo que debe tener en cuenta:

- Utilice esquemas remotos si tiene un servidor de GraphQL o si se siente cómodo construyendo uno usted mismo.
- Utilice acciones si necesita llamar a una API de REST

Desencadenantes de eventos {#event-triggers}
--------------

Se puede usar Hasura para [crear desencadenadores de eventos en tablas en la base de datos de Postgres](https://hasura.io/learn/database/postgresql/triggers/). Los desencadenantes de eventos capturan eventos de forma confiable en tablas especificadas e invocan webhooks para llevar a cabo cualquier lógica personalizada. Después de una operación de mutación, los desencadenantes pueden llamar a un webhook de forma asincrónica.

Caso de uso para la aplicación de tareas pendientes {#use-case-todo-app}
-------------------------

En el backend de la aplicación de tareas pendientes que ha construido, hay ciertas funcionalidades personalizadas que tal vez desee agregar:

Si desea buscar información de perfil de Auth0, necesita hacer una llamada de API a Auth0 con el token. Auth0 solo expone una API de REST y no GraphQL. Esta API tiene que estar expuesta al cliente de GraphQL.

Agregaremos una acción en Hasura para extender la API También veremos cómo se puede hacer lo mismo con un servidor de GraphQL personalizado agregado como esquema remoto.

- Reciba notificaciones por correo electrónico cada vez que un nuevo usuario se registra en la aplicación. Esta es una operación asincrónica que puede invocarse mediante un webhook desencadenador de eventos.

Veremos cómo se pueden gestionar estos 2 casos de uso en Hasura.

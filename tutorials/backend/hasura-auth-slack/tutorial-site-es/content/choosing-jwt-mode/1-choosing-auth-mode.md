---
title: "Elegir el modo correcto"
metaTitle: "Elegir el modo correcto | Tutorial de la cartulina de Hasura"
metaDescription: "Esta parte del tutorial cubre cómo elegir el modo auth correcto"
---

En esta parte, vamos a ver qué modo es adecuado para el clon de Slack.

### Uso del modo JWT

El modo JWT es una solución recomendada con Hasura, si su servidor Auth puede soportarlo.

Nuestro clon de aplicación de Slack no necesita integrarse con sistemas antiguos de autenticación o tiene reglas personalizadas complejas que solo pueden ser procesadas a través de un webhook. El servidor Auth puede configurarse para inyectar las reclamaciones hasura correctas en cada token que genera asegurando que las reglas de permisos se pueden aplicar.

La aplicación Slack tiene usuarios que necesitan asignar roles. El modo JWT es el modo recomendado debido a la facilidad de integración y los beneficios que aporta para los clientes.

### ¿Cuándo utilizar el modo webhook?

El modo Webhook generalmente se requiere si el servidor Auth que utiliza no puede emitir tokens JWT en el formato que Hasura espera que sea o no tiene integración JWT para empezar. Este es un caso de uso más común con los sistemas de auth existentes legacy. Tenga en cuenta que con un modo webhook, el webhook tiene que ser implementado, mantenido y cada vez que se hace una solicitud a Hasura, a su vez hará una solicitud al webhook para autorizar la solicitud. Esto podría tener una ligera latencia dependiendo de dónde se despliega el webhook.

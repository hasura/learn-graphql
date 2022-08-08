---
title: "Selección del modo correcto"
metaTitle: "Selección del modo correcto | Tutorial de Slack de autenticación de Hasura"
metaDescription: "En esta parte del tutorial se cubre cómo elegir el modo de autenticación correcto"
---

En esta parte, analizaremos qué modo es correcto para el clon de Slack.

### Uso del modo JWT {#using-jwt-mode}

El modo JWT es una solución recomendada con Hasura, si el servidor de autenticación es compatible.

Nuestro clon de la aplicación Slack no necesita integrarse con los sistemas de autenticación heredados ni tiene reglas personalizadas complejas que solo pueden ser procesadas a través de un webhook. El servidor de autenticación puede configurarse para insertar los reclamos de hasura correctos en cada token que genera asegurando que se puedan aplicar las reglas de permiso.

La aplicación Slack tiene usuarios a quienes se deben asignar roles. El modo JWT es el modo recomendado debido a la facilidad de integración y los beneficios que aporta para los clientes.

### ¿Cuándo utilizar el modo webhook? {#webhook-mode}

El modo Webhook es generalmente necesario si el servidor de autenticación que utiliza no puede emitir tokens de JWT en el formato que Hasura espera que sean o ni siquiera tiene integración de JWT. Este es un caso de uso más común con los sistemas de autenticación heredados existentes. Tenga en cuenta que con un modo de webhook, el webhook se tiene que desplegar, mantener y cada vez que se hace una solicitud a Hasura, a su vez hará una solicitud al webhook para autorizar la solicitud. Esto podría tener una ligera latencia dependiendo de dónde se despliega el webhook.

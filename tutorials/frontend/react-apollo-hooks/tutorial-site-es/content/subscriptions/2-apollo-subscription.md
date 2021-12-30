---
title: "Hook useSubscription de Apollo con React"
metaTitle: "Hook useSubscription de Apollo con React | Tutorial de hooks Apollo con React en GraphQL"
metaDescription: "La manera más sencilla de traer datos en vivo a su interfaz de usuario es utilizar el hook React useSubscription de los hooks React de Apollo."
---

La manera más sencilla de traer datos en vivo a su interfaz de usuario es utilizar el hook React useSubscription de los hooks React de Apollo. Esto le permite renderizar el flujo de datos de su servicio directamente en la función de renderizado de su componente. Una cosa a tener en cuenta es que las suscripciones no son más que «oyentes», no solicitan ningún dato al conectarse por primera vez, y que solo abren una conexión para obtener nuevos datos.
# Guía contribuyente

Si no se siente seguro acerca de cómo comenzar a contribuir, no dude en consultarnos en nuestro [Canal Discord] (https://discordapp.com/invite/hasura), en el canal #contrib. También puede continuar con su contribución y le daremos sus comentarios. No se preocupe, lo peor que puede pasar es que se le pida cortésmente que cambie algo. Apreciamos cualquier contribución, y no queremos que un muro de reglas se interponga en el camino de eso.

Sin embargo, para aquellas personas que desean un poco más de orientación sobre la mejor manera de contribuir al proyecto, siga leyendo. Este documento cubrirá lo que estamos buscando. Al abordar los siguientes puntos, las posibilidades de que
puede fusionar rápidamente o abordar sus contribuciones aumentará.

## Visión de conjunto

[hasura/aprender-graphql](https://github.com/hasura/learn-graphql) repo consiste en tutoriales para frontend, mobile y backend.

### Tutoriales

Nuestro objetivo es mantener el contenido de nuestro tutorial y las aplicaciones asociadas con él completo y actualizado. Si desea ayudarnos a hacerlo, le agradecemos cualquier tipo de contribución:

- Agregue nuevos tutoriales (comuníquese con nosotros si tiene ideas para evitar el trabajo duplicado).

- Informar contenido perdido.

- Corregir errores en tutoriales existentes.

- Ayúdanos a actualizar las versiones de la aplicación..

## Formas de contribuir

### Informar un problema

- Proporcione los pasos para reproducir el problema, incluido el tutorial que está probando..

- Incluya registros, si corresponde.

### Trabajando en un problema

- Asegúrese de que haya un problema asociado con el trabajo que está haciendo..

- Si está trabajando en un problema, comente que lo está haciendo para evitar que otros también dupliquen el trabajo..

- Aplasta tus commits y consulta el problema usando `fix # <issue-no>` o `close
  # <issue-no> `en el mensaje de confirmación, al final.
  Por ejemplo: `resolver respuestas a todo (arreglo # 42)` o `resolver respuestas a todo, corregir # 42`
  
- Rebase master con su sucursal antes de enviar una solicitud de extracción.

## Confirmar mensajes

- La primera línea debe ser un resumen de los cambios, sin exceder 50
caracteres, seguidos de un cuerpo opcional que tiene más detalles sobre el
cambios. Referirse a [este enlace](https://github.com/erlang/otp/wiki/writing-good-commit-messages)
  para obtener más información sobre cómo escribir buenos mensajes de confirmación.

- Use el tiempo presente imperativo: "agregar / arreglar / cambiar", no "agregar / arreglar / cambiar" ni "agregar / arreglar / cambiar"".

- No ponga en mayúscula la primera letra de la línea de resumen.

- No agregue un punto / punto (.) Al final de la línea de resumen.

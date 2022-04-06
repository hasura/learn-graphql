---
title: "Escribir el evento webhook"
metaTitle: "Escribir el evento webhook | Tutorial de GraphQL de Hasura"
metaDescription: "En esta parte, analizaremos cómo escribir un evento webhook y desencadenarlo de forma asincrónica después de una operación de mutación."
---

Ahora vamos a pasar al segundo caso de uso de enviar un correo electrónico cuando un usuario se registre en la aplicación.

Cuando el usuario se registra en la aplicación utilizando Auth0, insertamos una nueva fila en la tabla `users` para mantener los datos de usuario sincronizados. ¿Recuerda la regla de Auth0 que escribimos durante la suscripción para hacer una mutación?

Esta es una operación `insert` en la tabla `users`. La carga para cada evento se menciona [aquí](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload)

Ahora vamos a capturar esta operación de inserción para desencadenar nuestro evento.

## Api de correo electrónico de SMTP de SendGrid  {#sendgrid-smtp-email-api}

Para este ejemplo, vamos a hacer uso del servidor de SMTP de `SendGrid` y utilizar `nodemailer` para enviar el correo electrónico.

Regístrese en [SendGrid](https://sendgrid.com/) y cree una cuenta gratis.

Cree una clave de API mediante el seguimiento de los documentos [aquí](https://sendgrid.com/docs/for-developers/sending-email/integrating-with-the-smtp-api/)

### Escriba el webhook {#write-the-webhook}

```javascript
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport('smtp://'+process.env.SMTP_LOGIN+':'+process.env.SMTP_PASSWORD+'@' + process.env.SMTP_HOST);
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.post('/send-email', function(req, res) {

  const name = req.body.event.data.new.name;
  // setup e-mail data
  const mailOptions = {
      from: process.env.SENDER_ADDRESS, // sender address
      to: process.env.RECEIVER_ADDRESS, // list of receivers
      subject: 'A new user has registered', // Subject line
      text: 'Hi, This is to notify that a new user has registered under the name of ' + name, // plaintext body
      html: '<p>'+'Hi, This is to notify that a new user has registered under the name of ' + name + '</p>' // html body
  };
  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
      res.json({'success': true});
  });

});

app.listen(app.get('port'), function() {
  console.log('Server started on: ' + app.get('port'));
});
```

## Despliegue {#deploy}

[![DESPLEGAR EN GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~sendgrid-send-email-event)

## Variables del entorno {#environment-variables}

Después de volver a mezclar con su propio proyecto en Glitch, modifique el archivo `.env` para ingresar los valores

- `SMTP_LOGIN`,
- `SMTP_PASSWORD`,
- `SMTP_HOST`

adecuadamente.

Además, también debería configurar la dirección del remitente y del receptor utilizando las variables

- `SENDER_ADDRESS`
- `RECEIVER_ADDRESS`

de env.

¡Felicidades! Ha escrito y desplegado su primer webhook para gestionar los eventos de la base de datos.

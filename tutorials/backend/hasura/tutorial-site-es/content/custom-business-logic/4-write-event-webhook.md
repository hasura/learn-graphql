---
title: "Escribir evento webhook"
metaTitle: "Escribir evento webhook | Tutorial de Hasura"
metaDescription: "En esta parte, vamos a ver cómo escribir un webhook de evento y activarlos asincrónicamente después de una operación de mutación."
---

Ahora vamos a pasar al segundo caso de uso de enviar un correo electrónico cuando un usuario se registre en la aplicación.

Cuando el usuario se registra en la aplicación utilizando Auth0, insertamos una nueva fila en la `users`tabla para mantener sincronizados los datos del usuario. ¿Recuerdas la regla Auth0 que escribimos durante el registro para hacer una mutación?

Esta es una `insert`operación en la mesa.`users` La carga útil de cada evento se menciona [aquí](https://hasura.io/docs/latest/graphql/core/event-triggers/payload.html#json-payload)

Ahora vamos a capturar esta operación de inserción para activar nuestro evento.

## API de correo electrónico SMTP

Para este ejemplo, vamos a hacer uso del servidor SMTP `SendGrid`'s y usar `nodemailer`para enviar el correo electrónico.

Regístrate en [SendGrid](https://sendgrid.com/) y crea una cuenta gratuita.

Cree una clave de API siguiendo los documentos [aquí](https://sendgrid.com/docs/for-developers/sending-email/integrating-with-the-smtp-api/)

### Escribir el webhook

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

## Despliega

[![DEPLOY EN GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~sendgrid-send-email-event)

## Variables de medio ambiente

Después de remezclas a tu propio proyecto en Glitch, modifica el `.env`archivo para entrar

- `SMTP_LOGIN`,
- `SMTP_PASSWORD`,
- `SMTP_HOST`

valores apropiadamente.

Además, también debe configurar la dirección del remitente y del receptor mediante el uso

- `SENDER_ADDRESS`
- `RECEIVER_ADDRESS`

variables env.

¡Felicidades! Ha escrito e implementado su primer webhook para manejar eventos de base de datos.

---
title: "编写事件 webhook"
metaTitle: "编写事件 webhook | Hasura GraphQL 教程"
metaDescription: "这一部分将介绍如何编写事件 webhook 并在变更操作后异步触发它们。"
---

现在，我们转到第二个用例：当用户在应用程序上注册时发送电子邮件。

当用户使用 Auth0 在应用程序上注册时，我们会在`users`表中添加新的一行，以保持用户数据的同步。 还记得我们在注册时编写的用来进行更改的 Auth0 规则吗？

这是在表`users`上的`insert`操作。
每个事件的有效负载都记录在[此处](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload)

现在，我们将捕获此插入操作，以触发我们的事件。

## SendGrid SMTP 电子邮件 API {#sendgrid-smtp-email-api}

对于这个例子，我们将利用`SendGrid`的 SMTP 服务器，然后使用`nodemailer`发送电子邮件。

在 [SendGrid](https://sendgrid.com/) 上注册并创建一个免费帐户。

按照[此处](https://sendgrid.com/docs/for-developers/sending-email/integrating-with-the-smtp-api/)的文档创建一个 API 密钥

### 编写 webhook {#write-the-webhook}

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

## 部署 {#deploy}

[![部署到 GLITCH](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~sendgrid-send-email-event)

## 环境变量 {#environment-variables}

在 Glitch 上重新组合你自己的项目后，请修改`.env`文件，以正确输入

- `SMTP_LOGIN`、
- `SMTP_PASSWORD`等
- `SMTP_HOST`

值。

此外，你还应使用环境变量配置发件人和收件人的

- `SENDER_ADDRESS`
- `RECEIVER_ADDRESS`

地址。

恭喜！ 你已编写并部署你的第一个处理数据库事件的 webhook。

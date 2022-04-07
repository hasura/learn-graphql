---
title: "イベントwebhookの記述"
metaTitle: "イベントwebhookの記述 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、イベントWebhookを記述して、ミューテーション操作の後にそれらを非同期にトリガーする方法を見ていきます"
---

import YoutubeEmbed from "../../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/_6Sc5emXq5U" />

次にユーザーがアプリに登録したときにメールを送信する2番目のユースケースに移りましょう。

ユーザーが Auth0 を使用してアプリに登録すると、新しいデータを `users` テーブルに挿入してユーザーデータの同期を維持します。ミューテーションを作成するためにサインアップ中に作成した Auth0 ルールを覚えていますか？

これはテーブル `users` に対する `insert` 操作です。
各イベントのペイロードは[こちら](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload)に記載されています

次に、この挿入操作をキャプチャしてイベントをトリガーします。

## SendGrid SMTP 電子メール API

この例では `SendGrid` の SMTP サーバーを利用し `nodemailer` を使用してメールを送信します。

[SendGrid](https://sendgrid.com/)にサインアップして、無料のアカウントを作成します。

次のドキュメントに従って API キーを作成します [こちら](https://sendgrid.com/docs/for-developers/sending-email/integrating-with-the-smtp-api/)。

### webhookの記述

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

## デプロイ

[![GLITCH へデプロイ](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~sendgrid-send-email-event)

## 環境変数
Glitch で独自のプロジェクトにリミックスした後 `.env` ファイルを変更して
- `SMTP_LOGIN`
- `SMTP_PASSWORD`
- `SMTP_HOST`

の値を入力します。

さらに次に送信者と受信者のアドレスも設定する必要があります。
- `SENDER_ADDRESS`
- `RECEIVER_ADDRESS`

これらの環境変数。

おめでとうございます! データベースイベントを処理する最初の Webhook を記述してデプロイしました。

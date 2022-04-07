---
title: "イベントウェブフックを書く"
metaTitle: "イベントウェブフックを書く | Hasura GraphQLチュートリアル"
metaDescription: "ここでは、イベントウェブフックを書いて、ミューテーション操作後に非同期的にトリガーする方法を紹介します。"
---

では、ユーザーがアプリに登録したときにメールを送信する2番目のユースケースに移動します。

ユーザーがAuth0を使用してアプリに登録すると、新しい行を `users` テーブルに挿入してユーザーデータの同期を維持します。サインアップ時にミューテーションを作成するために書いたAuth0ルールを覚えていますか？

これはテーブル `users` の `insert` 操作です。各イベントのペイロードについては、[こちら](https://hasura.io/docs/latest/graphql/core/event-triggers/payload/#json-payload)をご覧ください。

この挿入操作をキャプチャしてイベントをトリガーしましょう。

## SendGrid SMTP電子メールAPI {#sendgrid-smtp-email-api}

この例では、`SendGrid` のSMTPサーバーを活用し、`nodemailer` を使ってメールを送信します。

[SendGrid](https://sendgrid.com/)にサインアップして、無料のアカウントを作成します。

[こちらの](https://sendgrid.com/docs/for-developers/sending-email/integrating-with-the-smtp-api/)ドキュメントに従ってAPIキーを作成します

### ウェブフックを書く {#write-the-webhook}

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

## デプロイ {#deploy}

[![Glitch にデプロイする](https://raw.githubusercontent.com/hasura/graphql-engine/master/community/boilerplates/auth-webhooks/nodejs-express/assets/deploy-glitch.png)](https://glitch.com/~sendgrid-send-email-event)

## 環境変数 {#environment-variables}

Glitchで自分のプロジェクトにリミックスした後、`.env` ファイルを変更して

- `SMTP_LOGIN`、
- `SMTP_PASSWORD`、
- `SMTP_HOST`

値を適切に入力します。

さらに、環境変数を使用して送信者と受信者のアドレスも設定する必要があります

- `SENDER_ADDRESS`
- `RECEIVER_ADDRESS`

。

おめでとうございます！データベースイベントを処理する最初のウェブフックを書いてデプロイしました。

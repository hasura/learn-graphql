---
title: "承認"
metaTitle: "Hasura での承認 | Hasura GraphQL チュートリアル"
metaDescription: "このチュートリアルでは、モデルにロールベースのアクセス制御ルールを定義することにより、Hasura GraphQL Engineで承認を行う方法について説明します"
---

import YoutubeEmbed from "../src/YoutubeEmbed.js";

<YoutubeEmbed link="https://www.youtube.com/embed/URMEgibHof0" />

このチュートリアルでは、作成した各モデルのロールベースのアクセス制御ルールを定義します。

アクセス制御ルールは、特定の条件に基づいてテーブルのクエリを制限するのに役立ちます。

このリアルタイムの ToDo アプリの使用例では、すべてのクエリをログインユーザーのみに制限する必要があります。 またテーブルの特定の列をユーザーに公開する必要はありません。

アプリの目的は、ユーザーが自分の ToDo のみを管理できるようにすることですが、すべての公開 ToDo を表示できるようにする必要があります。

以降の手順では、役割ベースのアクセス制御ルールに基づいてこれらすべてを定義します。

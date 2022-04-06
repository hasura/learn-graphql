---
title: "mutation後の楽観的なUIの更新（Optimistic UI Updates）"
metaTitle: "mutation後の楽観的なUIの更新 | GraphQL React Apolloフックチュートリアル"
metaDescription: "ReactアプリでGraphQL mutationを実行した後に、Apollo Client Optimistic ResponseでUIの更新を実行します。"
---

ユーザーがtodoを作成した後にラグが発生した場合、気付くことができます。mutationが成功すると仮定して、楽観的なUIの更新が実行されるUIを構築することもできます。

完了ステータスの切り替えやtodoの削除を可能にするには、mutationを実行するときに楽観的な更新を使用します。

以下のコンセプトを学びます。

- GraphQL mutationの作成
- `useMutation` Reactフックの使用
- 楽観的なUIの更新の組み込み
- 読み込み/終了/エラー状態のキャプチャ

始めましょう。

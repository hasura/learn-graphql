---
title: "レート制限"
metaTitle: "レート制限 | Hasura GraphQL上級チュートリアル"
metaDescription: "レート制限は、悪意あるクエリや実装が不十分なクエリが原因で引き起こされるAPIパフォーマンスの問題を確実に抑制できます。"
---

APIパフォーマンスの問題の主な原因は、悪意あるクエリや実装が不十分なクエリです。前のステップで設定したallow listsには、悪意あるクエリを制限する効果もあります。その一方で、APIのアクセスに制限が必要な場合も考えられます。

これは以下によって実装可能です

- APIの要求レートを設定する - レート制限
- 要求の深さを制限する - クエリの深さ制限

## API制限の設定 {#configuring-api-limit}

Hasuraクラウドでは、Pro/MonitoringタブからAPI制限を設定します。設定をするには、Consoleの `Pro` タブの `API Limits` ページに移動します。`Configure` をクリックして、ルールを指定します。

### レート制限 {#configuring-rate-limits}

1分あたりのGraphQL operationの回数を制限します。この設定には、スライディングウィンドウ方式が採用されています。つまり、Hasuraが要求を受信するたびに、そのクライアントからの受信レートを受け取った時点から1分間のレートを計測します。

ここではOperationのRate limitを100回に設定しましょう。また、Unique parametersも設定します。Unique parametersには、IPアドレスや `x-hasura-*` のようなセッション変数が設定できます。

`IP address` によるレート制限は、APIが広く一般公開されている場合や、クエリに認証されていない一般からのアクセスがある場合に有効です。

セッション変数によるレート制限は、アプリケーションのユーザーがAPIとデータベースに同等の負荷をかけている場合に有効です。

![ ロールベースのAPI制限 ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/role-based-api-limit.png)

API制限は、ロールごと、またはすべてのロールに対してグローバルに設定することも可能です。

### クエリの深さ制限 {#query-depth-limits}

クエリの深さに応じてGraphQL operationの回数を制限して、深くネストされたクエリを抑制します。API制限は、ロール（匿名、ユーザー）によって定義され、要求レート、クエリの深さ、またはその両方を制限できます。Unique parametersには、IPアドレスやセッション変数（x-hasura-user-idやx-hasura-org-idなど）を含めることができます。

Slackのスキーマで、ユーザーが次のようなクエリを実行したとします。

```graphql
query userDetails {
  users {
    id
    name
    display_name
    bio
    channel_members {
      id
      user {
        id
        name
      }
      channel {
        id
        name
        channel_members {
          id
          user {
            id
          }
        }
      }
    }
  }
}
```

このクエリには、リレーションシップによる複数の深さがあります。リレーションシップの性質上、クエリの中でループが続くこともあります。この例の場合、 `channel_members` がその中の `user` リレーションシップとともに2回クエリされています。これが続くと、非常に長いSQLクエリが生成されることがあります。このようなクエリはデータベースのパフォーマンスに悪影響を与えるだけでなく、何の価値ももたらさないことから、実行されるクエリの深さは適切な数に制限すべきです。

クエリの適切な深さは、どのように判断すればいいのでしょうか。Allow Listタブには、 `New Operations` のリストがあり、深さごとのクエリの実行数を正確に把握できます。

ここでは他の本物のクエリを通過させるため、クエリの深さは5で問題ないとしましょう。API Limitsにも同様の値を設定します。

![ API Limits ](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/api-limits.png)

---
title: "GraphQLの中核的概念"
metaTitle: "GraphQLの中心的な概念 | GraphQLチュートリアル"
metaDescription: "GraphQLの中心的な概念（ドキュメント、操作、フィールド、引数、変数、エイリアス、フラグメント、ディレクティブ）について学びます"
---

GraphQLは、REST APIの経験がある人向けに新しい概念を導入します。このセクションでは、クライアント/フロントエンドの観点から、GraphQLの中心的な概念について紹介します。

## GraphQLドキュメント {#graphql-document}
GraphQLリクエスト文字列の内容をGraphQLドキュメントと呼びます。これは、ドキュメントの一例です。

```graphql
{
  author {
    id
    name
  }
}
```

文字列は、GraphQLサーバーまたはクライアントが解析および検証できる上記のような構文に従います。上記の構文は、クエリ操作に簡潔な表現を使用します。

## GraphQL操作 {#graphql-operation}
GraphQL操作のタイプは以下の通りです。

- クエリ（読み取り専用取得）
- ミューテーション（書き込み後に取得）
- サブスクリプション（ソースイベントに応じてデータを取得する長期間リクエスト）

GraphQLドキュメントには、これらの操作（複数のクエリ/ミューテーション/サブスクリプション）を1つまたは複数含めることができます。

操作を持つGraphQLドキュメントの例を見ていきましょう。

```graphql
query {
  author {
    id
    name
  }
}
```

この例では、ドキュメントにはクエリ操作が含まれています。GraphQL操作は、選択セットと呼ばれる必要な情報のセットを選択します。上記の例では、クエリ操作は、`author` と、その `id` および `name` に関する情報を選択します。

ここでは、ドキュメントの構造を詳細に紹介します。

## GraphQLドキュメントの構造 {#anatomy-of-a-graphql-document}

以下の例を紹介します。

```graphql
query {
  author(limit: 5) {
    id
    name
  }
}
```

これがクエリ操作を持つ別のGraphQLドキュメントであることに気づかれたことと思います。

ドキュメントの残りの部分は何で構成されるのでしょうか？見ていきましょう。

#### フィールド {#fields}

GraphQLフィールドは、個別の情報を記述します。この情報は、シンプルな場合もあれば、データ間の関連を含み複雑な場合があります。

上記のドキュメントで、操作内で囲まれたものはすべてフィールドです（作成者、id、名前）。

```
author {
  id
  name
}
```

以下のような関連を持つ複雑な情報がある場合があります。

```graphql
query {
  author(limit: 5) {
    id
    name
    articles {
      id
      title
      content
    }
  }
}
```

ここでは、作成者フィールドに加えて、フィールド間の関連を表現できる記事フィールドもあります。

#### 引数 {#arguments}

フィールドを値を返す関数と考えます。これで、関数が異なる振る舞いをする引数を受け入れることを想定しましょう。

上記の例では、

```
author(limit: 5)
```

作成者フィールドは、返される結果の数を制限するために引数 `limit` を受け入れます。これらの引数は任意の場合も必須の場合もあり、ドキュメント内のいずれかのフィールドに表されます。

#### 変数 {#variables}

GraphQLクエリは、クライアント側でのクエリの再利用と容易な構築のための変数でパラメータ化されます。

上記の例では、ページを表示するユーザーが制限パラメータを設定でき、変数をフィールド引数に渡す方が容易です。

```
query ($limit: Int) {
  author(limit: $limit) {
    id
    name
  }
}
```

変数は操作の上部で定義され、クライアントはサーバーが理解する形式で変数の値を送信できます。典型的な変数は、以下のようにJSONで表されます。

```
{
  limit: 5
}
```

#### 操作名 {#operation-name}

ドキュメントが複数の操作を含む場合、サーバーは結果を同じ順序で実行する必要があることを認識し、結果を同じ順序でマッピングする必要があります。

例：

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic
  }
}
query fetchAuthors {
  author(limit: 5, order_by: { name: asc }) {
    id
    name
    profile_pic
  }
}
```

これには2つの操作があります。1つは1人の作成者を取得するための操作、もう1つは複数の作成者を取得する操作です。

これらは、シンプルなGraphQLリクエストでよく使用される最も一般的なものです。

ここでは、より複雑なアプリが使用する他の概念を紹介します。

#### エイリアス {#aliases}

以下の例を考慮します。

```graphql
query fetchAuthor {
  author(id: 1) {
    name
    profile_pic_large: profile_pic(size: "large")
    profile_pic_small: profile_pic(size: "small")
  }
}
```

作成者に関する情報を取得する場合、2つのイメージとさまざまなサイズがあり、取得のための引数を持つフィールドがあるとします。この場合、同じ選択セットで同じフィールドを2回使用することはできず、`Alias` は2つのフィールドの区別に役立ちます。

#### フラグメント {#fragments}

フラグメントによって、GraphQLをより再利用しやすくなります。あるタイプで同じフィールドを再利用する部分がドキュメントにある場合、フラグメントが有効になることがあります。

例：

```graphql
fragment authorFields on author {
  id
  name
  profile_pic
  created_at
}

query fetchAuthor {
  author(id: 1) {
    ...authorFields
  }
}

query fetchAuthors {
  author(limit: 5) {
    ...authorFields
  }
}
```

ここではフラグメント（`...authorFields`）が使用されていることが分かります。このタイプの使用をスプレッドフラグメントと呼びます。また、フラグメントを別途明示的に宣言するのではなく、クエリでインラインを使用するインラインフラグメントもあります。

#### ディレクティブ {#directives}

ディレクティブは、レスポンスの値に影響を与えることなく追加機能を追加しますが、クライアントに返るレスポンスには影響を与える場合がある識別子です。

識別子 `@` の後には、オプションで名前付き引数の一覧が続きます。

GraphQL仕様がサポートするデフォルトサーバーディレクティブは以下の通りです。

- @deprecated(reason: String) - フィールドを廃止予定としてマークします
- @skip (if: Boolean) -このフィールドのGraphQLの実行をスキップします
- @include (if: Boolean) - trueの場合、注釈付きフィールドのリゾルバーを呼びます。

例：

```graphql
query ($showFullname: Boolean!) {
  author {
    id
    name
    fullname @include(if: $showFullname)
  }
}
```

上記のクエリで、条件がtrueの場合のみフィールドのフルネームを含みます（条件は、アプリに応じて独自のロジックを持つことができます）。

カスタムディレクティブを使用して、他のユースケースを処理することもできます。

実際にGraphQLで、これらの基本的な概念を試してください。もう、これらの基本的な概念を使いこなせるはずです！

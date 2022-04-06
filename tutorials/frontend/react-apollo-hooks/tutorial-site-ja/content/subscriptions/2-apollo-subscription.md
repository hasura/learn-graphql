---
title: "Apollo useSubscription Reactフック"
metaTitle: "Apollo useSubscription Reactフック | GraphQL React Apolloフックチュートリアル"
metaDescription: "ライブデータをUIに取り込む最も簡単な方法は、Apollo React-HooksのuseSubscription Reactフックを使うことです。"
---

ライブデータをUIに取り込む最も簡単な方法は、Apollo React-HooksのuseSubscription Reactフックを使うことです。これにより、コンポーネントのレンダリング機能内のサービスから直接データのストリームをレンダリングできます。subscriptionは単なるlistenerであるため、最初に接続したときはデータを要求せず、新しいデータ取得のためだけに接続を開くという点に注意してください。
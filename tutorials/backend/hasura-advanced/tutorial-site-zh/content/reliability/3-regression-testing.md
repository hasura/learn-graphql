---
title: "回归测试"
metaTitle: "回归测试 | Hasura GraphQL 高级教程"
metaDescription: "回归测试确保持续支持你的前端应用程序或用户所需的操作"
---

回归测试确保继续支持您的前端应用程序或用户所需的操作，即针对这些操作验证GraphQL模式的变化（模式的完整性），以确保您的GraphQL API中没有破坏性变化或回归。

![使用Hasura进行回归测试](https://hasura.io/blog/content/images/2020/02/regression-testing-diagram-2.png)

你的生产实例通常应该被配置为运行回归测试套件，因为对底层[Postgres的架构](https://hasura.io/learn/database/postgresql/core-concepts/1-postgresql-schema/) 和/或Hasura配置的变化有可能导致你的模式出现不必要的回归。这对于迭代新功能或删除现有功能至关重要。

## 创建测试套件{#create-test-suite}

在Hasura Cloud控制台上，在Pro/监测选项卡下，`Regresstion Tests`最后转到。选择通常从前端客户端访问的操作。在我们的slack模型中，我们希望同时添加用户和频道查询，到目前为止我们已经尝试过。单击`Add to test suite`。添加后，我们现在可以更改模式以验证是否已捕获回归。

![创建套件](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-suite.png)

通过CLI打开Hasura控制台。(`http://localhost:9695`)。现在，让我们对通道表做一个模式改变，将该`name`列重命名为 `channel_name`。

然后通过标`Run Tests`签运行测试套件。现在通道查询应该失败了。

![运行回归测试套件](https://graphql-engine-cdn.hasura.io/learn-hasura/assets/graphql-hasura-advanced/regression-test-run.png)

有以下错误`field "name" not found in type: 'channel'`。

这种测试确保了在没有对客户进行相关更新的情况下，不会将破坏性变化推送到生产中。

**注意**：我们可以从任何其他云项目中选择测试套件在当前项目上运行。当在生产实例上配置的测试套件在模式改变后的暂存环境上工作时，这很有用。

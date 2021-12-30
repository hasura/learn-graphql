---
title: "处理加载/错误"
metaTitle: "Apollo useQuery React hook 错误处理| GraphQL React Apollo Hook 教程"
metaDescription: "我们将在 React 应用程序中使用 Apollo useQuery React hook 属性来处理 GraphQL 加载和错误状态 - 加载和错误"
---

正如我们在上一步中看到的，Apollo 返回一个带有属性的结果对象。其中，`loading`和`error`是常见的，您需要在自己的应用程序中处理。

现在让我们返回到您在上一步中编写的 `useQuery` React hook。

```javascript

  const TodoPrivateListQuery = () => {
  const { loading, error, data } = useQuery(GET_MY_TODOS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }
  return <TodoPrivateList todos={data.todos} />;
};

```

### Apollo 查询加载状态
当该组件挂载时，后台发送的 GraphQL 查询可能还没有完成。但我们需要处理这个临时的无数据状态，因此我们在 `loading` 状态期间返回一些有用的文本。在这个加载状态下，您通常可以做一些花哨的事情，比如显示一个加载旋转器。

### Apollo 查询错误状态
由于各种原因，该查询也可能最终处于 `error` 状态。有时 graphql 查询可能是错误的，或者服务器没有响应。无论是什么原因，用户界面应该显示一些内容，告诉用户发生了错误。在这种错误状态下，您通常可以将这些错误消息发送到第三方服务，以追踪出了什么问题。


总而言之，这是需要在您的组件内部处理的两个重要状态。您上面所编写的是基本内容，但对于本教程来说足够了。

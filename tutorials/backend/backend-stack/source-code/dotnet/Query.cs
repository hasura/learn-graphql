namespace HasuraDOTNetSample.Models;

public class Query
{
    public Todo[] GetTodos() => new Todo[]
    {
        new Todo { Id = "1", Text = "Todo 1", Done = false, User = new User { Id = Guid.NewGuid(), Name = "User 1" } },
        new Todo { Id = "2", Text = "Todo 2", Done = true, User = new User { Id = Guid.NewGuid(), Name = "User 2" } },
        new Todo { Id = "3", Text = "Todo 3", Done = false, User = new User { Id = Guid.NewGuid(), Name = "User 3" } },
    };
}
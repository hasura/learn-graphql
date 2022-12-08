namespace HasuraDOTNetSample.Models;

public class EventTriggerPayload<T>
{
    public Event<T> Event { get; set; }
    public string Created_At { get; set; }
    public string Id { get; set; }
    public Trigger Trigger { get; set; }
    public Table Table { get; set; }
}

public class Table
{
    public Table(string name = "", string schema = "dbo")
    {
        this.name = name;
        this.schema = schema;
    }


    public string schema { get; set; }
    public string name { get; set; }
}

public class Trigger
{
    public string Name { get; set; }
}

public class Event<T>
{
    public object Session_Variables { get; set; }
    public string Op { get; set; }
    public Data<T> Data { get; set; }
}

public class Data<T>
{
    public T Old { get; set; }
    public T New { get; set; }
}

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; }
}
using HasuraDOTNetSample.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/action", (ActionPayload<LoginArgs> action) =>
{
    return new LoginResponse() { AccessToken = "<sample value>" };
});

app.MapPost("/event", (EventTriggerPayload<User> payload) =>
{
    Console.WriteLine($"New user created: {payload.Event.Data.New.Name}");
    return new { };
});


// Build Services to Expose Hot Chocolate GraphQL API
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>();

// Inject Services to use StrawBerry Shake Client

builder.Services
         .AddHasuraClient()
         .ConfigureHttpClient(client => client.BaseAddress = new Uri("<Hasura URL>/v1/graphql"));

IServiceProvider services = builder.Services.BuildServiceProvider();

var client = services.GetRequiredService<HasuraDOTNetSample.IHasuraClient>();

app.MapGet("/getTodos", async (HasuraDOTNetSample.HasuraClient hasuraClient) =>
{
    var result = await hasuraClient.GetUsers.ExecuteAsync();
    return Results.Ok(result);
});

app.Run();

using dotnet.action;
using dotnet.Models;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/action", (ActionPayload<LoginArgs> action) =>
{
    return new LoginResponse() { AccessToken = "<sample value>"};
});

app.MapPost("/trigger", (EventTriggerPayload<LoginArgs> action) =>
{
    return new LoginResponse() { AccessToken = "<sample value>"};
});

app.Run();

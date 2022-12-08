using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TodoApp.Services;

namespace TodoApp.Controllers;

[Authorize]
public class TodosController : Controller
{
    private readonly ITodoClient _todoClient;

    public TodosController(ITodoClient todoClient)
    {
        _todoClient = todoClient;
    }
    // GET
    public async Task<IActionResult> Index()
    {
        var todos = await _todoClient.GetMyTodos.ExecuteAsync();
        return View(todos.Data?.Todos);
    }
}
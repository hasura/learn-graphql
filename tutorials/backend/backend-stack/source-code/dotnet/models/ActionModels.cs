namespace HasuraDOTNetSample.Models;

public class LoginResponse
{ 
    public string AccessToken { get; set; }
}

public class Mutation
{
    public LoginResponse Login { get; set; }
}

public class LoginArgs
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class ActionPayload<T>
{
    public Dictionary<string, string> SessionVariables { get; set; }
    
    public T Input { get; set; }
}
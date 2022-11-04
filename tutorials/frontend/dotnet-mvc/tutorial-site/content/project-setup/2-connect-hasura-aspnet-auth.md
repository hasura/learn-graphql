---
title: "Connect Hasura with ASP.NET Authentication "
metaTitle: "Connect Hasura with ASP.NET Authentication | ASP.NET MVC GraphQL Tutorial"
metaDescription: "In this step we will configure ASP.NET Authentication  rules to specify Hasura specific custom claims."
---

In this part, you will learn how to connect Hasura with the ASP.NET application that you just created in the previous step.

## Adding JWT claims to ASP.NET Authentication
To use JWT in ASP.NET, you will need to add a package to your project. You will also need to add a few lines of code to configure the JWT claims.

### Install JWT package
To install the JWT package, we will use the `dotnet` CLI.

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package System.IdentityModel.Tokens.Jwt
```

### Create a service for creating JWT tokens
Because the application is using ASP.NET Identity, you will need to create a service that will create JWT tokens for the user. This service will be used to create the JWT token that will be used to authenticate the user from the ASP.NET application to Hasura.

Create a new file `JwtTokenService.cs` in the `Services` folder and add the following code:

```csharp
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TodoApp.Services
{
    public class JwtTokenService
    {
        private readonly IConfiguration _configuration;

        public JwtTokenService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string CreateToken(string userId, string userName)
        {
          var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", userName) }),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
```

This service will be used to create the JWT token that will be used to authenticate the user from the ASP.NET application to Hasura. We will need to inject this service into the Services in the `Program.cs` file.

```csharp
builder.Services.AddScoped<JwtTokenService>();
```

Now we will be able to use the `JwtTokenService` to create JWT tokens for the user in any of our ASP.NET controllers.
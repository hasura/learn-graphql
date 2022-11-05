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
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JwtTokenService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
        }

        public string CreateToken()
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier)
                .Value;
            var userName = _httpContextAccessor.HttpContext.User.Identity.Name;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:key"]);


            var claims = new Dictionary<string, object>
            {
                {
                    "https://hasura.io/jwt/claims",
                    new Dictionary<string, object>
                    {
                        {"x-hasura-allowed-roles", new[] {"user"}},
                        {"x-hasura-default-role", "user"},
                        {"x-hasura-user-id", userId}
                    }
                }
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] {new Claim("id", userName)}),
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials =
                    new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Claims = claims
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
```

This service will be used to create the JWT token that will be used to authenticate the user from the ASP.NET application to Hasura. We will need to inject this service into the Services in the `Program.cs` file.

**Note** : The JWT token is valid for 1 minute since we are using it directly during the request and not storing it anywhere. Also this JWT is not being used from the client side so there is no need to store it in a cookie or local storage.

```csharp
builder.Services.AddSingleton<JwtTokenService>();
```

Now we will be able to use the `JwtTokenService` to create JWT tokens for the user in any of our ASP.NET controllers.

### Configure JWT claims in ASP.NET
To configure JWT claims we will need to the appsettings.json file. Add the following lines to the `appsettings.json` file:

```json
"Jwt": {
    "key": "MyReallySecureSecretThatMustBe32CharactersLong",
    "Issuer": "https://localhost:5001",
    "Audience": "https://localhost:5001"
  }
```

We will use this information to configure Hasura for JWT authentication. In production you will want to use a more secure key and a different issuer and audience.

Since we are using H256 algorithm, the key must be 32 characters long. You can use any other algorithm and key length as per your requirements.

### Configure Hasura to Accept JWT
To configure Hasura we will define a custom environment variable `HASURA_GRAPHQL_JWT_SECRET` in the `docker-compose.yml` file. This environment variable will be used to configure Hasura to accept JWT tokens.

```yaml
HASURA_GRAPHQL_JWT_SECRET: '{"type": "HS256", "key": "mysecretkey", "claims_format": "json","audience": "https://localhost:5001", "issuer": "https://localhost:5001"}'
```

**Note** In production you will want to use a more secure key and a different issuer and audience. This also must match the values in the `appsettings.json` file.


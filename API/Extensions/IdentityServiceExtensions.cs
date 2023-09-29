using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using API.Services;
using Persistence;
using Domain;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireDigit = false;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequiredLength = 1;
                opt.Password.RequiredUniqueChars = 0;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            /* 
            ! IMPORTANT
            TODO: One method of hiding keys (See Docs Below)
            * Currently stored in appsettings.Development.json
            * https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=linux
            */
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

            // In order to get access to the SingInManager
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        //! This is where our app secret is being validated
                        //* App secret never leaves server
                        //* App secret is encoded and used as signature on JWT that goes to client
                        //* When client returns JWT in Auth Headers, secret key is used to validate
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        // TODO: Update at a later date
                        ValidateIssuer = false,
                        ValidateAudience = false,
                    };
                });
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
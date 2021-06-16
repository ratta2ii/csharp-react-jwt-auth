using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServicesExtension
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
      });
      services.AddDbContext<DataContext>(opt =>
      {
        // opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        // Inside "appsettings.development.json" ConnectionStrings property
        // "DefaultConnection": "Data source=oauth.db" (for sqlite)
        opt.UseNpgsql(config.GetConnectionString("DefaultConnection"));
      });
      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
        {
          policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
        });
      });

      return services;
    }
  }
}
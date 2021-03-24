using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using FluentValidation.AspNetCore;
using API.Extensions;
using Application.Activities;
using API.Middleware;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            // This simply imports the class ApplicationServicesExtensions.cs to keep code clean. You could also hard code the same code from this class here as well (Please see commented out code below)
            services.AddApplicationServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                // Using custom middleware above to handle exceptions rather than this
                // app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            //! Cors goes directly after the UseRouting (Name the policy (above) as a parameter)
            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}





// //! This is the Startup class before it was refactored to import some of its functionality from a newly created class
// using MediatR;
// using Microsoft.AspNetCore.Builder;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.OpenApi.Models;
// using Persistence;
// using Application.Activities;
// using Application.Core;

// namespace API
// {
//   public class Startup
//   {
//     private readonly IConfiguration _config;
//     public Startup(IConfiguration config)
//     {
//       _config = config;
//     }

//     // This method gets called by the runtime. Use this method to add services to the container.
//     public void ConfigureServices(IServiceCollection services)
//     {

//       services.AddControllers();
//       services.AddSwaggerGen(c =>
//       {
//         c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
//       });
//       services.AddDbContext<DataContext>(opt =>
//       {
//         opt.UseSqlite(_config.GetConnectionString("DefaultConnection"));
//       });
//       services.AddCors(opt =>
//       {
//         opt.AddPolicy("CorsPolicy", policy =>
//         {
//           policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
//         });
//       });
//       // List, as in the List class here in the project
//       services.AddMediatR(typeof(List.Handler).Assembly);
//       services.AddAutoMapper(typeof(MappingProfiles).Assembly);
//     }

//     // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//     public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//     {
//       if (env.IsDevelopment())
//       {
//         app.UseDeveloperExceptionPage();
//         app.UseSwagger();
//         app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
//       }

//       // app.UseHttpsRedirection();

//       app.UseRouting();

//       //! Cors goes directly after the UseRouting (Name the policy (above) as a parameter)
//       app.UseCors("CorsPolicy");

//       app.UseAuthorization();

//       app.UseEndpoints(endpoints =>
//       {
//         endpoints.MapControllers();
//       });
//     }
//   }
// }

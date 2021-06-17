using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using API.Middleware;
using API.Extensions;

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
                
            services.AddControllers(opt =>
            {
                // Authorization Policy Ensures all endpoints on API require auth (except: [AllowAnonymous])
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy)); 
            });

            // This simply imports the class cusstom classes to keep code clean (Instead of hard coding here). 
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Custom Ex handling middleware
            app.UseMiddleware<ExceptionMiddleware>();

            /*
            TODO: Raise C security rating to A
            ? https://securityheaders.com (Test website security rating)
            ? NWebsec.AspNetCore.Middleware security package
            */
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());

            app.UseCsp(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com",
                    "sha256-AbpHGcgLb+kRsJGnwFEktk7uzpZOCcBY74+YBdrKVGs=",
                    "sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=",
                    "sha256-tekUYy0NkA+O1VOKFNT8dKWreGklo3ejoHu6gC++VBI="
                ))
                .FontSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com",
                    "https://www.robotstxt.org",
                    "https://fonts.gstatic.com",
                    "data:"
                ))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ScriptSources(s => s.Self().CustomSources(
                    "sha256-pz50DyrkssNZYZUtYddeJSW8YUsYBWOZNz1x1kHRCRc="
                ))
            );


            // TODO: #2
            app.UseXContentTypeOptions();


            if (env.IsDevelopment())
            {
                // Using custom middleware above to handle exceptions rather than this
                // app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }
            else 
            {
                //! Below is not working w/ Heroku
                app.UseHsts();
                // so adding custom middleware below instead
                // app.Use(async (context, next) =>
                // {
                //     context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                //     await next.Invoke();
                // });
            }
            app.UseHttpsRedirection();

            app.UseRouting();


            // Looks in "wwwroot" for any "index.html"
            // Scripts in the client must run a postbuild operation to move build files to wwwroot
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            //! Cors goes directly after the UseRouting (Name the policy (above) as a parameter)
            app.UseCors("CorsPolicy");

            //! Authentication must proceed Authorization (i.e. right here in the code as well)
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                // App only knows about routes in API, so to serve client routes (from build files)
                // it is necessary to create a "Fallback" Controller to handle these routes
                endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
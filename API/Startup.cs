using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

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
                // Create Authorization Policy
                // Ensures all endpoints on API require authentication (except: [AllowAnonymous])
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy)); 
            });

            // This simply imports the class "ApplicationServicesExtensions" class to keep code clean. You could also hard code the same code from this class here as well
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            /*
            !IMPORTANT
            TODO: THIS DOES NOT WORK HERE (I removed Ex Middleware, so need to add an exception handler)
            app.UseExceptionHandler();
            */

            /*
            !IMPORTANT
            ? https://securityheaders.com (Test website security rating)
            ? NWebsec.AspNetCore.Middleware security package
            TODO: Uncomment code after hosting
            */
            app.UseXContentTypeOptions();
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            app.UseXfo(opt => opt.Deny());
            app.UseCspReportOnly(opt => opt
                .BlockAllMixedContent()
                .StyleSources(s => s.Self())
                .FontSources(s => s.Self())
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self())
                .ScriptSources(s => s.Self())
            );

            if (env.IsDevelopment())
            {
                // Using custom middleware above to handle exceptions rather than this
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            // Looks in "wwwroot" for any "index.html"
            // Remember that scripts in the client must run a postbuild operation to move build
            // files/folder to "wwwroot" 
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
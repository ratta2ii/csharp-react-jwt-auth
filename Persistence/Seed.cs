using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {

            // Seeds User in DB
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{ DisplayName = "Cindy", UserName = "Cindy", Email = "bob@example.com" },
                    new AppUser{ DisplayName = "Jane", UserName = "Jane", Email = "jane@example.com" },
                    new AppUser{ DisplayName = "Jack", UserName = "Jack", Email = "jack@example.com" },
                };

                foreach (var user in users) {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

          
            await context.SaveChangesAsync();
        }
    }
}
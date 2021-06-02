using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string AppUserId { get; set; }
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }
}
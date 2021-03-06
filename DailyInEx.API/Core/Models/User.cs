using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DailyInEx.API.Core.Models
{
    public class User : IdentityUser<int>
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }

    }
}
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DailyInEx.API.Core.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}
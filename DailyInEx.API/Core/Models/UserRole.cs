using Microsoft.AspNetCore.Identity;

namespace DailyInEx.API.Core.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}
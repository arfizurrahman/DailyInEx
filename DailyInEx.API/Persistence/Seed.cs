using System.Collections.Generic;
using System.Linq;
using DailyInEx.API.Core.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace DailyInEx.API.Persistence
{
    public class Seed
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public Seed(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Persistence/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                var roles = new List<Role> 
                {
                    new Role { Name = "Member"},
                    new Role { Name = "Admin"},
                    new Role { Name = "Moderator"}
                };

                foreach(var role in roles)
                {
                    _roleManager.CreateAsync(role).Wait();
                }

                foreach (var user in users)
                {
                    _userManager.CreateAsync(user, "Arfiz00@").Wait();
                    _userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new User {
                    UserName = "Admin",
                    Email = "admin@gmail.com"
                };

                IdentityResult result = _userManager.CreateAsync(adminUser, "Arfiz00@").Result;

                if(result.Succeeded) {
                    var admin = _userManager.FindByNameAsync("Admin").Result;
                    _userManager.AddToRolesAsync(admin, new [] {"Admin", "Moderator"}).Wait();
                }
            }
        }
    }
}
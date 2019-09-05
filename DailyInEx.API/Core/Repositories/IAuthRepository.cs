using System.Threading.Tasks;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Core.Repositories
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Core.Repositories
{
    public interface IUsersRepository
    {
         Task<User> GetUser(int id);
    }
}
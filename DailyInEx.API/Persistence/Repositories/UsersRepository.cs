using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;

namespace DailyInEx.API.Persistence.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        public Task<User> GetUser(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
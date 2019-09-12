using System.Threading.Tasks;

namespace DailyInEx.API.Core.Repositories
{
    public interface ICommonRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
    }
}
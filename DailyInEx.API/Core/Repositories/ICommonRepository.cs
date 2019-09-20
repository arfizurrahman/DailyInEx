using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Core.Repositories
{
    public interface ICommonRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<IEnumerable<Income>> GetYearlyProfits(int id, string year);
         Task<bool> SaveAll();
    }
}
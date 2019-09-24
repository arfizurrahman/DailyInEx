using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Core.Repositories
{
    public interface IProfitRepository
    {
         Task<IEnumerable<Profit>> GetYearlyProfits(int id, int year);
    }
}
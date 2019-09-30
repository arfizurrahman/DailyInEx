using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Helpers;

namespace DailyInEx.API.Core.Repositories
{
    public interface IIncomeRepository
    {
         Task<Income> GetIncome(int id);
         Task<IEnumerable<Income>> GetPendingIncomes(int id);
         Task<PagedList<Income>> GetPendingIncomes(TableParams tableParams);
         Task<IEnumerable<Income>> GetMonthlyIncomes(int id, string monthYear);
    }
}
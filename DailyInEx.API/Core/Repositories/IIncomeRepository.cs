using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Helpers;

namespace DailyInEx.API.Core.Repositories
{
    public interface IIncomeRepository
    {
         Task<Income> GetIncome(int id);
         Task<double> GetTotalIncomeOfCurrentMonth(int id);
         Task<IEnumerable<Income>> GetPendingIncomes();
         Task<PagedList<Income>> GetPendingIncomes(TableParams tableParams);
         Task<PagedList<Income>> GetMonthlyIncomes(int id, TableParams tableParams, string monthYear);
         Task<IEnumerable<Income>> GetMonthlyIncomesForPdf(int id, string monthYear);
         Task<IEnumerable<Income>> GetRecentIncomes(int id,int count);
    }
}
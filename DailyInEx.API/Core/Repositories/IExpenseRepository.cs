using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Helpers;

namespace DailyInEx.API.Core.Repositories
{
    public interface IExpenseRepository
    {
         Task<Expense> GetExpense(int id);
         Task<PagedList<Expense>> GetPendingExpenses(TableParams tableParams);
         Task<IEnumerable<Expense>> GetPendingExpenses();
         Task<IEnumerable<Expense>> GetMonthlyExpenses(int id, string monthYear);

    }
}
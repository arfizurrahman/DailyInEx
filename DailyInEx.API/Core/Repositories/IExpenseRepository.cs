using System.Collections.Generic;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Core.Repositories
{
    public interface IExpenseRepository
    {
         Task<Expense> GetExpense(int id);
         Task<IEnumerable<Expense>> GetPendingExpenses(int id);
         Task<IEnumerable<Expense>> GetMonthlyExpenses(int id, string monthYear);
    }
}
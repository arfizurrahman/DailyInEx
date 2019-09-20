using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DailyInEx.API.Persistence.Repositories
{
    public class ExpenseRepository : IExpenseRepository
    {
        private readonly DataContext _context;

        public ExpenseRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Expense> GetExpense(int id)
        {
            return await _context.Expenses.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<IEnumerable<Expense>> GetMonthlyExpenses(int id, string monthYear)
        {
            var expenses = await _context.Expenses
                        .Where(i => i.Date.ToString()
                        .Contains(monthYear) && i.UserId == id && 
                        i.IsApproved).ToListAsync();
            return expenses;
            
        }

        public async Task<IEnumerable<Expense>> GetPendingExpenses(int id)
        {
            var expenses = await _context.Expenses
                        .Where(i => i.UserId == id && !i.IsApproved).ToListAsync();
            return expenses;
        }
    }
}
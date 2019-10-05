using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using DailyInEx.API.Helpers;
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

        public async Task<PagedList<Expense>> GetMonthlyExpenses(int id, TableParams tableParams, string monthYear)
        {
            var expenses = _context.Expenses
                        .Where(i => i.Date.ToString()
                        .Contains(monthYear) && i.UserId == id && 
                        i.IsApproved).OrderByDescending(e => e.Date);
            
            return await PagedList<Expense>.CreateAsync(expenses, tableParams.PageNumber, tableParams.PageSize);
        }

        public async Task<IEnumerable<Expense>> GetMonthlyExpensesForPdf(int id, string monthYear)
        {
            var expenses = await _context.Expenses
                        .Where(e => e.Date.ToString()
                        .Contains(monthYear) && e.UserId == id && 
                        e.IsApproved).OrderByDescending(e => e.Date).ToListAsync();
            
            return expenses;
        }

        public async Task<PagedList<Expense>> GetPendingExpenses(TableParams tableParams)
        {
            var expenses = _context.Expenses
                        .Where(i => !i.IsApproved);

            return await PagedList<Expense>.CreateAsync(expenses, tableParams.PageNumber, tableParams.PageSize);
        }

        public async Task<IEnumerable<Expense>> GetPendingExpenses()
        {
            var expenses = await _context.Expenses
                        .Where(i => !i.IsApproved).ToListAsync();
            return expenses;
        }
    }
}
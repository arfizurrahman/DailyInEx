using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DailyInEx.API.Persistence.Repositories
{
    public class IncomeRepository : IIncomeRepository
    {
        private readonly DataContext _context;

        public IncomeRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Income> GetIncome(int id)
        {
            return await _context.Incomes.FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<IEnumerable<Income>> GetMonthlyIncomes(int id, string monthYear)
        {
            var incomes = await _context.Incomes
                        .Where(i => i.Date.ToString()
                        .Contains(monthYear) && i.UserId == id && 
                        i.IsApproved).ToListAsync();
            return incomes;
            
        }

        public async Task<IEnumerable<Income>> GetPendingIncomes(int id)
        {
            var incomes = await _context.Incomes
                        .Where(i => i.UserId == id && !i.IsApproved).ToListAsync();
            return incomes;
        }
    }
}
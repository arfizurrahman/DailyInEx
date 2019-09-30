using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using DailyInEx.API.Helpers;
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

        public async Task<IEnumerable<Income>> ApprovePendingIncomes(int id, int[] ids)
        {
            return await _context.Incomes.Where(i => ids.Contains(i.Id)).ToListAsync();
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

        public async Task<IEnumerable<Income>> GetPendingIncomes()
        {
            var incomes = await _context.Incomes
                        .Where(i => !i.IsApproved).ToListAsync();
            return incomes;
        }

        public async Task<PagedList<Income>> GetPendingIncomes(TableParams tableParams)
        {
           var incomes = _context.Incomes
                        .Where(i => !i.IsApproved);

            return await PagedList<Income>.CreateAsync(incomes, tableParams.PageNumber, tableParams.PageSize);
        }
    }
}
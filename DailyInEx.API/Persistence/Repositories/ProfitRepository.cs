using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DailyInEx.API.Persistence.Repositories
{
    public class ProfitRepository : IProfitRepository
    {
        private readonly DataContext _context;

        public ProfitRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Profit>> GetYearlyProfits(int id, int year)
        {
            
            var incomes = await _context
                        .Incomes
                        .Where(i => i.Date.Year == year && i.UserId == id && i.IsApproved)
                        .Select(i => new Profit { Month = i.Date.Month, Income = i.Amount, Expense = 0.0 }).ToListAsync();

            var expenses = await _context
                        .Expenses
                        .Where(e => e.Date.Year == year && e.UserId == id && e.IsApproved)
                        .Select(e => new Profit { Month = e.Date.Month, Income = 0.0, Expense = e.Amount }).ToListAsync();

            var summary = incomes
                        .Concat(expenses)
                        .GroupBy(s => s.Month)
                        .Select(g => new Profit { 
                            Month = g.Key, 
                            Income = g.Sum(x => x.Income), 
                            Expense = g.Sum(x => x.Expense),
                            TotalProfit = g.Sum(x => x.Income) - g.Sum(x => x.Expense)
                        }).OrderBy(i => i.Month).ToList();
            
            return summary;

        }
        // public async Task<IEnumerable<object>> GetYearlyIncomes(int id, int year)
        // {

        //  var incomes = _context.Incomes.Where(i => i.Date.Year == year && i.UserId == id && i.IsApproved).ToList();
        //     var expenses =  _context.Expenses.Where(e => e.Date.Year == year && e.UserId == id && e.IsApproved).ToList();
           
        //    var groupedIncome = incomes
        //          .GroupBy(inc => inc.Date.Month) //group it by month
        //          .Select(groupedIncomeByMonth => 
        //              new { 
        //                  Month = groupedIncomeByMonth.Key, 
        //                  Amount = groupedIncomeByMonth
        //                               .Sum(monthIncome => monthIncome.Amount), 
        //                  IsIncome = true}).ToList(); // Marker for Concat/Union All

        //     var groupedExpenses = expenses
        //                     .GroupBy(exp => exp.Date.Month)
        //                     .Select(groupedExpenseByMonth => 
        //                         new { 
        //                             Month = groupedExpenseByMonth.Key, 
        //                             Amount = groupedExpenseByMonth
        //                                             .Sum(monthExpense => monthExpense.Amount), 
        //                             IsIncome = false }).ToList(); // marker for Concat/Union All

        //     var summary = groupedIncome.Concat(groupedExpenses)
        //                 .GroupBy(x => x.Month)
        //                 .Select(r => 
        //                        new Profit { 
        //                                Month = r.Key, 
        //                                Income = r.Where(p => p.IsIncome).Sum(g => g.Amount), 
        //                                Expense = r.Where(p => !p.IsIncome).Sum(g => g.Amount)
        //                            }).ToList();
         
        //     return summary;

        // }
    }
}
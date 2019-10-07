using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using DailyInEx.API.Core.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class ProfitsController : ControllerBase
    {
        private readonly IMapper _maper;
        private readonly IProfitRepository _profitRepo;

        public ProfitsController(IMapper maper, 
            IProfitRepository profitRepo)
        {
            _maper = maper;
            _profitRepo = profitRepo;
        }
        
        [HttpGet]
        public async Task<IActionResult> GetYearlyProfits(int userId, int year)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var yearlyProfits = await _profitRepo.GetYearlyProfits(userId, year);
            var profitsForFullYear = new List<Profit>();

            for (int i = 1; i <= 12; i++)
            {
                if(yearlyProfits.Any(p => p.Month == i)){
                    profitsForFullYear.Add(yearlyProfits.First(p => p.Month == i));
                }else{
                    var profit = new Profit{
                        Month = i,
                        Income = 0,
                        Expense = 0,
                        TotalProfit = 0
                    };
                    profitsForFullYear.Add(profit);
                }
            }
            
            return Ok(profitsForFullYear);
        }
    }
}
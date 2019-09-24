using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
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
            
            return Ok(yearlyProfits);
        }
    }
}
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncomeController : ControllerBase
    {
        private readonly ICommonRepository _commonRepo;
        private readonly IIncomeRepository _incomeRepo;
        private readonly IMapper _mapper;

        public IncomeController(ICommonRepository commonRepo, 
            IIncomeRepository incomeRepo, IMapper mapper)
        {
            _commonRepo = commonRepo;
            _incomeRepo = incomeRepo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateIncome(int userId, IncomeForCreationDto incomeForCreationDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var incomeToCreate = _mapper.Map<Income>(incomeForCreationDto);

            _commonRepo.Add(incomeToCreate);

            if(await _commonRepo.SaveAll()) {
                var incomeToReturn = _mapper.Map<IncomeToReturnDto>(incomeToCreate);
            }
        }
    }
}
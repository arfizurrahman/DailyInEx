using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class IncomesController : ControllerBase
    {
        private readonly ICommonRepository _commonRepo;
        private readonly IIncomeRepository _incomeRepo;
        private readonly IMapper _mapper;

        public IncomesController(ICommonRepository commonRepo, 
            IIncomeRepository incomeRepo, IMapper mapper)
        {
            _commonRepo = commonRepo;
            _incomeRepo = incomeRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetIncome")]
        public async Task<IActionResult> GetIncome(int userId, int id) 
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var income = await _incomeRepo.GetIncome(id);

            if(income == null)
                return NotFound();
            
            return Ok(income);
        }

        [HttpPost]
        public async Task<IActionResult> Create(int userId, IncomeForCreationDto incomeForCreationDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            // incomeForCreationDto.Date = DateTime.Now;
            incomeForCreationDto.UserId = userId;
            var incomeToCreate = _mapper.Map<Income>(incomeForCreationDto);

            _commonRepo.Add(incomeToCreate);

            if(await _commonRepo.SaveAll()) {
                var incomeToReturn = _mapper.Map<IncomeToReturnDto>(incomeToCreate);
                return CreatedAtRoute("GetIncome", new { id = incomeToCreate.Id}, incomeToReturn);
            }
            throw new Exception("Creating the income failed on save");
        }

        [HttpGet("Pending")]
        public async Task<IActionResult> GetPendingIncomes(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var incomesFromRepo =  await _incomeRepo.GetPendingIncomes(userId);

            var incomesToReturn = _mapper.Map<IEnumerable<IncomeToReturnDto>>(incomesFromRepo);

            return Ok(incomesToReturn);
        }

        [HttpGet("Monthly")]
        public async Task<IActionResult> GetMonthlyIncomes(int userId, string monthYear)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var monthlyIncomes = await _incomeRepo.GetMonthlyIncomes(userId, monthYear);

            var incomesToReturn = _mapper.Map<IEnumerable<IncomeToReturnDto>>(monthlyIncomes);

            return Ok(incomesToReturn);
        }

        [HttpPost("Approve")]
        public async Task<IActionResult> ApprovePendingIncomes(int userId, IncomesApproveDto incomesApproveDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var incomesToApprove = await _incomeRepo.GetPendingIncomes(userId);
            incomesToApprove = incomesToApprove.Where(i => incomesApproveDto.IncomeIds.Contains(i.Id));
            foreach(var income in incomesToApprove)
            {
                income.IsApproved = true;
            }

            await _commonRepo.SaveAll();

            return NoContent();
        }
    }
}
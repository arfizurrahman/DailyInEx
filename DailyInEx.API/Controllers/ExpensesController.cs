using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using DailyInEx.API.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class ExpensesController : ControllerBase
    {
        private readonly ICommonRepository _commonRepo;
        private readonly IExpenseRepository _expenseRepo;
        private readonly IMapper _mapper;

        public ExpensesController(ICommonRepository commonRepo, 
            IExpenseRepository expenseRepo, IMapper mapper)
        {
            _commonRepo = commonRepo;
            _expenseRepo = expenseRepo;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetExpense")]
        public async Task<IActionResult> GetExpense(int userId, int id) 
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var income = await _expenseRepo.GetExpense(id);

            if(income == null)
                return NotFound();
            
            return Ok(income);
        }

        [HttpPost]
        public async Task<IActionResult> Create(int userId, ExpenseForCreationDto expenseForCreationDto)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            expenseForCreationDto.Date = DateTime.Now;
            expenseForCreationDto.UserId = userId;
            var expenseToCreate = _mapper.Map<Expense>(expenseForCreationDto);

            _commonRepo.Add(expenseToCreate);

            if(await _commonRepo.SaveAll()) {
                var expenseToReturn = _mapper.Map<ExpenseToReturnDto>(expenseToCreate);
                return CreatedAtRoute("GetExpense", new { id = expenseToCreate.Id}, expenseToReturn);
            }
            throw new Exception("Creating the expense failed on save");
        }

        // [HttpGet("Pending")]
        // public async Task<IActionResult> GetPendingExpenses(int userId)
        // {
        //     if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
        //         return Unauthorized();
                
        //     var expensesFromRepo =  await _expenseRepo.GetPendingExpenses(userId);

        //     var expensesToReturn = _mapper.Map<IEnumerable<ExpenseToReturnDto>>(expensesFromRepo);

        //     return Ok(expensesToReturn);
        // }

        [HttpGet("Monthly")]
        public async Task<IActionResult> GetMonthlyExpenses(int userId, [FromQuery] TableParams tableParams)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var monthYear = tableParams.Year + "-" + tableParams.Month.ToString("00"); 
            
            var expensesFromRepo = await _expenseRepo.GetMonthlyExpenses(userId, tableParams, monthYear);

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseToReturnDto>>(expensesFromRepo);

            Response.AddPagination(expensesFromRepo.CurrentPage, 
                expensesFromRepo.PageSize, expensesFromRepo.TotalCount, 
                expensesFromRepo.TotalPages);

            return Ok(expensesToReturn);
        }

        [HttpGet("MonthlyPdf")]
        public async Task<IActionResult> GetMonthlyExpensesForPdf(int userId, int month, int year)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var monthYear = year + "-" + month.ToString("00"); 
            
            var expensesFromRepo = await _expenseRepo.GetMonthlyExpensesForPdf(userId, monthYear);

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseToReturnDto>>(expensesFromRepo);

            return Ok(expensesToReturn);
        }

        [HttpGet("Recent")]
        public async Task<IActionResult> GetRecentExpenses(int userId, int count)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var expensesFromRepo = await _expenseRepo.GetRecentExpenses(userId, count);

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseToReturnDto>>(expensesFromRepo);

            return Ok(expensesToReturn);
        }

        [HttpGet("CurrentMonthsExpense")]
        public async Task<IActionResult> GetTotalExpenseOfCurrentMonth(int userId)
        {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            
            var expenseAmount = await _expenseRepo.GetTotalExpenseOfCurrentMonth(userId);
            var expenseToReturn = new ExpenseToReturnDto{
                Amount = expenseAmount
            };

            return Ok(expenseToReturn);
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Repositories;
using DailyInEx.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ICommonRepository _commonRepo;
        private readonly IIncomeRepository _incomeRepo;
        private readonly IExpenseRepository _expenseRepo;
        private readonly IMapper _mapper;
        public AdminController(ICommonRepository commonRepo, 
            IExpenseRepository expenseRepo,
            IIncomeRepository incomeRepo, IMapper mapper)
        {
            _commonRepo = commonRepo;
            _expenseRepo = expenseRepo;
            _incomeRepo = incomeRepo;
            _mapper = mapper;
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("ApproveIncomes")]
        public async Task<IActionResult> ApprovePendingIncomes(IncomesApproveDto incomesApproveDto)
        {
            var incomesToApprove = await _incomeRepo.GetPendingIncomes();
            if(incomesApproveDto.IncomeIds != null) {
                incomesToApprove = incomesToApprove.Where(i => incomesApproveDto.IncomeIds.Contains(i.Id));
            }
            foreach(var income in incomesToApprove)
            {
                income.IsApproved = true;
            }

            await _commonRepo.SaveAll();

            return NoContent();
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpPost("ApproveExpenses")]
        public async Task<IActionResult> ApprovePendingExpenses(ExpensesApproveDto expensesApproveDto)
        {
            var expensesToApprove = await _expenseRepo.GetPendingExpenses();
            expensesToApprove = expensesToApprove.Where(i => expensesApproveDto.ExpenseIds.Contains(i.Id));
            foreach(var expense in expensesToApprove)
            {
                expense.IsApproved = true;
            }

            await _commonRepo.SaveAll();

            return NoContent();
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("PendingIncomes")]
        public async Task<IActionResult> GetPendingIncomes([FromQuery] TableParams tableParams)
        {
            var incomesFromRepo =  await _incomeRepo.GetPendingIncomes(tableParams);

            var incomesToReturn = _mapper.Map<IEnumerable<IncomeToReturnDto>>(incomesFromRepo);
            Response.AddPagination(incomesFromRepo.CurrentPage, 
                incomesFromRepo.PageSize, incomesFromRepo.TotalCount, 
                incomesFromRepo.TotalPages);
            return Ok(incomesToReturn);
        }

        [Authorize(Policy = "RequiredAdminRole")]
        [HttpGet("PendingExpenses")]
        public async Task<IActionResult> GetPendingExpenses()
        {
            var expensesFromRepo =  await _expenseRepo.GetPendingExpenses();

            var expensesToReturn = _mapper.Map<IEnumerable<ExpenseToReturnDto>>(expensesFromRepo);

            return Ok(expensesToReturn);
        }
    }
}
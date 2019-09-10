using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;
using DailyInEx.API.Core.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DailyInEx.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repository;
        private readonly IMapper _mapper;
        public UsersController(IUsersRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            
            var userToReturn = _mapper.Map<UserToReturnDto>(user);

            return Ok(userToReturn);
        }
    }
}
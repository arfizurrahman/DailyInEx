using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DailyInEx.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IConfiguration config, 
            IMapper mapper,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.UserName = userForRegisterDto.Email;
            var userToCreate = _mapper.Map<User>(userForRegisterDto);
           
            var result = await _userManager.CreateAsync(userToCreate, userForRegisterDto.Password);
            await _userManager.AddToRoleAsync(userToCreate, "Member");
            var userRole = new UserRole {
                UserId = userToCreate.Id,
                RoleId = 1
            };

            var userToReturn = _mapper.Map<UserToReturnDto>(userToCreate);

            if(result.Succeeded) {
                  return CreatedAtRoute("GetUser", 
                    new { Controller= "Users", id = userToCreate.Id}, userToReturn);
            }

            return BadRequest(result.Errors);

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto) 
        {
            var user = await _userManager.FindByEmailAsync(userForLoginDto.Email);
            
            if(user == null)
                return BadRequest("No user found with this email!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, userForLoginDto.Password, false);
            if(result.Succeeded){
                var appUser = await _userManager.Users
                    .FirstOrDefaultAsync(u => u.Email == userForLoginDto.Email);
                    
                var userToReturn = _mapper.Map<UserToReturnDto>(appUser);
            
                return Ok(new {
                    token = GenerateJwtToken(appUser).Result,
                    user = userToReturn
                });
            }

            return BadRequest("Invalid login information!");
        }

        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var roles = await _userManager.GetRolesAsync(user);

            foreach(var role in roles) 
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor); 

            return tokenHandler.WriteToken(token);
        }
    }
}
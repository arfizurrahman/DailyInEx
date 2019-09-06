using AutoMapper;
using DailyInEx.API.Core.Dtos;
using DailyInEx.API.Core.Models;

namespace DailyInEx.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserToReturnDto>();
            CreateMap<UserForRegisterDto, User>();
        }
    }
}
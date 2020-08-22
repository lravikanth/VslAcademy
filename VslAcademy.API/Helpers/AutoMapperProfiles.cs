using AutoMapper;
using VslAcademy.API.Dtos.Authorization;
using VslAcademy.API.Models.Authentication;

namespace VslAcademy.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
             CreateMap<UserForRegistrationDto,User>()
                .ForPath(m => m.UserRole.RoleId , opts => opts.MapFrom(src => src.RoleId));
        }
    }
}
using AutoMapper;
using VslAcademy.API.Dtos.Authorization;
using VslAcademy.API.Dtos.MathSkills;
using VslAcademy.API.Models.Authentication;
using VslAcademy.API.Models.MathSkills;

namespace VslAcademy.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
             CreateMap<UserForRegistrationDto,User>()
                .ForPath(m => m.UserRole.RoleId , opts => opts.MapFrom(src => src.RoleId));
             CreateMap<ReceiveQuestionDto,Question>();    
             CreateMap<ReceiveAnswersDto,Answer>()
                    .ForMember(dest => dest.CreatedDate, opts => opts.UseDestinationValue())
                    .ForMember(dest => dest.CreatedBy, opts => opts.UseDestinationValue());    
        }
    }
}
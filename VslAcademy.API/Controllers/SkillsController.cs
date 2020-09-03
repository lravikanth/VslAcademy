using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using VslAcademy.API.Data.MathSkills;
using VslAcademy.API.Dtos;
using VslAcademy.API.Dtos.MathSkills;
using VslAcademy.API.Helpers;
using VslAcademy.API.Models.Authentication;
using VslAcademy.API.Models.MathSkills;

namespace VslAcademy.API.Controllers
{
    [Route("api/{userId}/[controller]")]
    [ApiController]
    [Authorize]
    public class SkillsController : ControllerBase
    {
        private readonly ISkillsRepository _skillsRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public SkillsController(ISkillsRepository repo,
                                IConfiguration config,
                                IMapper mapper,
                                IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
            _config = config;
            _skillsRepo = repo;
            
        }

          [HttpGet("{subDomainId}/{gradeId}")]
        public async Task<IActionResult> getSkills(int userId, int subDomainId,int gradeId){
            // if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            // if(!HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value))    
            //     return Unauthorized();

             var mathSkills = await _skillsRepo.GetSkills(subDomainId,gradeId);

             return Ok(mathSkills);
        }

          [HttpGet("{skillId}")]
        public async Task<IActionResult> getMathSubDomain(int userId, int skillId){
            // if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            // if(!HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value))    
            //     return Unauthorized();

             var skill = await _skillsRepo.GetSkill(skillId);

             return Ok(skill);
        }

         [HttpPut]
         public async Task<IActionResult> AddUpdateSkill(int userId, [FromBody] ReceiveSkillGradeMappingDto mappingDto) {
            // if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();
            // if(!HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value))    
            //     return Unauthorized();
           if (mappingDto.id != 0) {
            var skillObj = await _skillsRepo.GetSkill(mappingDto.id);    
            skillObj.SkillName = mappingDto.skillName;
            skillObj.GradeMapping = mappingDto.gradeMapping;
            } else {
                var mathskill = new MathSkill();
                mathskill.MathSubDomainId = mappingDto.subDomainId;
                mathskill.SkillName = mappingDto.skillName;
                mathskill.GradeMapping = mappingDto.gradeMapping;
                _skillsRepo.Add<MathSkill>(mathskill);
            }
            try{
            if (await _skillsRepo.SaveAll())
                return NoContent();
            } catch (Exception ex) {
                throw ex;
            }
            throw new Exception($"Updating skill {mappingDto.id} failed on save.");
         }


    }
}
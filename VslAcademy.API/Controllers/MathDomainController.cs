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
    public class MathDomainController : ControllerBase
    {
        private readonly ISkillsRepository _skillsRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public MathDomainController(ISkillsRepository repo,
                                IConfiguration config,
                                IMapper mapper,
                                IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
            _config = config;
            _skillsRepo = repo;
            
        }

        [HttpGet]
        public async Task<IActionResult> getMathDomains(int userId){
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

             var mathDomains = await _skillsRepo.GetDomains();   

             return Ok(mathDomains);
        }

        [HttpGet("subdomain/{subDomainId}")]
        public async Task<IActionResult> getMathSubDomain(int userId, int subDomainId){
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

             var mathSubDomains = await _skillsRepo.GetSubDomain(subDomainId);

             return Ok(mathSubDomains);
        }

        [HttpGet("schoolGrades")]
        public async Task<IActionResult> getSchoolGrades(int userId){
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

             var schoolGrades = await _skillsRepo.GetSchoolGrades();

             return Ok(schoolGrades);
        }

        [HttpGet("{subDomainId}")]
        public async Task<IActionResult> getSkills(int subDomainId,int userId){
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

             var mathSkills = await _skillsRepo.GetSubDomain(subDomainId);   

             return Ok(mathSkills);
        }
         [HttpPut("{domainId}")]
         public async Task<IActionResult> UpdateDomain(int userId, int domainId, [FromBody] StringDto strDomain) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();
            if (domainId != 0) {
            var domainObj = await _skillsRepo.GetDomain(domainId);    
            domainObj.Domain = strDomain.strData;
            domainObj.UpdatedDate = DateTime.Now;
            domainObj.UpdatedBy = userId;
            } else {
                var newDomain = new MathDomain();
                newDomain.Domain = strDomain.strData;
                newDomain.UpdatedDate = DateTime.Now;
                newDomain.UpdatedBy = userId;
                newDomain.CreatedBy = userId;
                newDomain.CreatedDate = DateTime.Now;
                _skillsRepo.Add<MathDomain>(newDomain);
            }
            try{
            if (await _skillsRepo.SaveAll())
                return NoContent();
            } catch (Exception ex) {
                throw ex;
            }
            throw new Exception($"Updating domain {domainId} failed on save.");
         }
         [HttpPost("subdomain/{subDomainId}")]
         public async Task<IActionResult> UpdateSubDomain(int userId, int subDomainId, [FromBody] ReceiveSubdomainGradeMappingDto mappingDto) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

            if (subDomainId == 0) {
            var domainObj = await _skillsRepo.GetSubDomain(subDomainId);    
            domainObj.SubDomain = mappingDto.subDomain;
            domainObj.GradeMapping = mappingDto.gradeMapping;
            } else {
                var newSubDomain = new MathSubDomain();
                newSubDomain.SubDomain = mappingDto.subDomain;
                newSubDomain.GradeMapping = mappingDto.gradeMapping;
                newSubDomain.MathDomainId = mappingDto.domainId;

                _skillsRepo.Add<MathSubDomain>(newSubDomain);
            }

            try{
            if (await _skillsRepo.SaveAll())
                return NoContent();
            } catch (Exception ex) {
                throw ex;
            }
            throw new Exception($"Updating domain {subDomainId} failed on save.");
         }

         [HttpGet("subdomains/{domainId}/{gradeId}")]
         public async Task<IActionResult> GetSubDomains(int userId, int domainId, int gradeId) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.ContentManagement, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

            var subDomainObj = await _skillsRepo.GetSubDomains(domainId,gradeId);    
         
            return Ok(subDomainObj);
         }
    }
}
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
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
    public class QuestionsController : ControllerBase
    {
        private readonly ISkillsRepository _skillsRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;
        public QuestionsController(ISkillsRepository repo,
                                IConfiguration config,
                                IMapper mapper,
                                IMemoryCache memoryCache)
        {
             _mapper = mapper;
            _memoryCache = memoryCache;
            _config = config;
            _skillsRepo = repo;
        }
        
        [HttpGet("{SkillId}/{GradeId}")]
        public async Task<IActionResult> GetQuestions(int userId, int SkillId, int GradeId) {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.Questions, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

            var skill = await _skillsRepo.GetSkill(SkillId);
            var skillGradeMappingId = skill.GradeMapping.Find(x => x.GradeId == GradeId).Id;
            var list = await _skillsRepo.GetQuestions(skillGradeMappingId);

            return Ok(list);
        }

        [HttpPut("{SkillId}/{GradeId}")]
        public async Task<IActionResult> AddUpdateQuestion(int userId,int SkillId, int GradeId, [FromBody] ReceiveQuestionDto QueDto) {
            if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.Questions, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

             var question = new Question();
             _mapper.Map(QueDto,question);
             question.UpdatedBy = userId;
             question.UpdatedDate = DateTime.Now;
             question.Answer.UpdatedBy = userId;
             question.Answer.UpdatedDate = DateTime.Now;
             if (QueDto.Id == 0) {
                var skill = await _skillsRepo.GetSkill(SkillId);
                question.SkillGradeMappingId = skill.GradeMapping.Find(x => x.GradeId == GradeId).Id;
                question.CreatedBy = userId;
                question.CreatedDate = DateTime.Now;
                question.Answer.CreatedBy = userId;
                question.Answer.CreatedDate = DateTime.Now;
             
             _skillsRepo.Add<Question>(question);
             } else {
                 question = await _skillsRepo.GetQuestion(QueDto.Id);
                 _mapper.Map(QueDto,question);
             }

             try{
            if (await _skillsRepo.SaveAll())
                return Ok(question);
            } catch (Exception ex) {
                throw ex;
            }
            throw new Exception($"Update/Add of question failed on save.");
        }
        [HttpPost("addImage")]
        public async Task<IActionResult> AddImage(int userId, [FromForm] ImageUploadForQuestion fileDto) {
             if(userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            if(! CommonMethods.HasAccess(PermissionsList.Questions, User.FindFirst(ClaimTypes.GivenName).Value,_memoryCache))   
                return Unauthorized();

         try
    {
        var file = fileDto.file;
        var folderName = Path.Combine("Resources", "Questions");
        var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
        if (file.Length > 0)
        {
            var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            var fullPath = Path.Combine(pathToSave, fileName);
            var dbPath = Path.Combine(folderName, fileName);
            using (var stream = new FileStream(fullPath, FileMode.Create))
            {
                file.CopyTo(stream);
            }
            return Ok(dbPath); 
        }
        else
        {
            return BadRequest();
        }
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex}");
    }
}

    }
}
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using VslAcademy.API.Data.Authorization;
using VslAcademy.API.Dtos.Authorization;
using VslAcademy.API.Models.Authentication;

namespace VslAcademy.API.Controllers
{
     [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;
        private readonly IMemoryCache _memoryCache;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper , IMemoryCache memoryCache)
        {
            _mapper = mapper;
            _memoryCache = memoryCache;
            _config = config;
            _repo = repo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistrationDto userForRegistrationDto) {
            
            userForRegistrationDto.UserName = userForRegistrationDto.UserName.ToLower();
            if (await _repo.UserExists(userForRegistrationDto.UserName))
                return BadRequest("User already exists");

            var userToCreate = _mapper.Map<User>(userForRegistrationDto);
            var createdUser = await _repo.Register(userToCreate, userForRegistrationDto.Password);

            return Ok(createdUser);         
        }

        [HttpPost("login")]
        public async Task<IActionResult> login(UserForLoginDTO userForLoginDTO)
        {
            var userFromRepo = await _repo.Login(userForLoginDTO.UserName, userForLoginDTO.Password);

            if (userFromRepo == null)
                return Unauthorized("Incorrect user name and/or password.");
            
            var userRole =new UserRoles();

            if (!_memoryCache.TryGetValue(userFromRepo.UserName,out userRole))
            {
                userRole = await _repo.GetAuthorizationInfo(userFromRepo.Id);
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    // Keep in cache for this time, reset time if accessed.
                    .SetSlidingExpiration(TimeSpan.FromDays(1));

                // Save data in cache.
                _memoryCache.Set(userFromRepo.UserName, userRole, cacheEntryOptions);
            }

            List<string> listPermissions = new List<string>();

            foreach (var item in userRole.Role.rolePermissions)
                listPermissions.Add(item.permission.PermissionName);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.GivenName,userFromRepo.UserName.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.FirstName.ToString() + ' ' + userFromRepo.LastName.ToString() ),
                new Claim(ClaimTypes.UserData,JsonConvert.SerializeObject(listPermissions)),
                new Claim(ClaimTypes.Role,userRole.Role.RoleName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            var Cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = Cred
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}
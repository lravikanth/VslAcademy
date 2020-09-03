using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using VslAcademy.API.Models.Authentication;


namespace VslAcademy.API.Data.Authorization
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IMemoryCache _memoryCache;

        public AuthRepository(DataContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }
        public async Task<User> Login(string username, string password)
        {
           var user=  await _context.Users.FirstOrDefaultAsync(x => x.UserName == username);
 
           if (user == null)
                return null;

           if (!VerifyPasswordHash(password,
                                  user.PasswordHash,
                                  user.PasswordSalt))
              return null;                        

           return user;
        }

        public async Task<UserRoles> GetAuthorizationInfo(int userId)
                {
                    var query =  _context.UserRoles.Include(role => role.Role)
                                        .Include(p => p.Role.rolePermissions).ThenInclude(c =>c.permission).AsQueryable();
                    
                    return await query.Where(p => p.UserId == userId).SingleOrDefaultAsync();
                }

        // public async Task<IEnumerable<UserRoles>> GetAuthorizationInfo(int userId)
        // {
        //     var query =  _context.UserRoles.Include(role => role.Role)
        //                         .Include(p => p.Role.rolePermissions).ThenInclude(c =>c.Permission).AsQueryable();
            
        //     return await query.Where(p => p.UserId == userId).ToListAsync();
        // }

         private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordsalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordsalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])  return false;
                }
                return true;
            }
        }
        
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password,
                               out passwordHash,
                               out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;    
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}
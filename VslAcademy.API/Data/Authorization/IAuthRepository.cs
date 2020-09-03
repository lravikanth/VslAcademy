using System.Collections.Generic;
using System.Threading.Tasks;
using VslAcademy.API.Models.Authentication;

namespace VslAcademy.API.Data.Authorization
{
    public interface IAuthRepository
    {
          Task<User> Register(User user, string password);

            Task<User> Login(string username, string password);

            Task<bool> UserExists(string username);

            Task<UserRoles>  GetAuthorizationInfo(int userId);

    }
}
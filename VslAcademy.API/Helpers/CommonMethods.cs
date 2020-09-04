using Microsoft.Extensions.Caching.Memory;
using VslAcademy.API.Models.Authentication;

namespace VslAcademy.API.Helpers
{
    public class CommonMethods
    {
        public static bool HasAccess(string strPermission, string userName, IMemoryCache cache) {
             var userRole =new UserRoles();
            if (cache.TryGetValue(userName,out userRole))
            {
                foreach (var permission in userRole.Role.rolePermissions)
                {
                    if (permission.permission.PermissionName.ToString() == strPermission)
                    return true;
                }
            }
        return true;
        }
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.Authentication
{
    public class RolePermissions
    {
        public int Id { get; set; }
        
        [ForeignKey("UserRoles")]
        public int RoleId { get; set; }
        public int PermissionId { get; set; }

        public Permission permission{ get; set; }

       
    }
}
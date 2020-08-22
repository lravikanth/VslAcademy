using System.ComponentModel.DataAnnotations;

namespace VslAcademy.API.Models.Authentication
{
    public class Roles
    {
        [Key]
        public int RoleId { get; set; }
        public int RoleName { get; set; }
    }
}
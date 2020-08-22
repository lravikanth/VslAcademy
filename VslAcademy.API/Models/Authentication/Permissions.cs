using System.ComponentModel.DataAnnotations;

namespace VslAcademy.API.Models.Authentication
{
    public class Permissions
    {
        [Key]
        public int PermissionId { get; set; }
        public string PermissionName { get; set; }
    }
}
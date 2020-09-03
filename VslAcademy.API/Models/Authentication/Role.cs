using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.Authentication
{
    public class Role
    {
        [Key]
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        
        [ForeignKey("RoleId")]
        public ICollection<RolePermissions> rolePermissions{get; set;}
    }
}
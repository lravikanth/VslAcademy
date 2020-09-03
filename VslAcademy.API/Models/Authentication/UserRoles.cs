using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.Authentication
{
    public class UserRoles
    {
        public int Id { get; set; }
       
        public int UserId { get; set; }
        public int RoleId { get; set; }
        [ForeignKey("RoleId")]
        public Role Role {get; set;}        
    }
}
using System;
using System.ComponentModel.DataAnnotations;

namespace VslAcademy.API.Dtos.Authorization
{
    public class UserForRegistrationDto
    {
        [Required]
        public string UserName {get;set;}
        [Required]
        [StringLength(50,MinimumLength=4, ErrorMessage="Password needs to be between 4 and 20 character.")]
        public string  Password { get; set; }
         [Required]
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
         [Required]
        public  string Email { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? LastActivity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public int RoleId {get; set;}
        public UserForRegistrationDto()
        {
            Created = DateTime.Now;
        }
    }
}
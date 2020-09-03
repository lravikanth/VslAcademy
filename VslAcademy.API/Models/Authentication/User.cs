using System;

namespace VslAcademy.API.Models.Authentication
{
    public class User
    {
        public int Id { get; set; }
        public string UserName {get;set;}
        public string FirstName {get;set;}
        public string LastName {get;set;}

        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public  string Email { get; set; }
        public DateTime Created { get; set; }
        public DateTime? LastActivity { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public UserRoles UserRole {get; set;}

    }
}
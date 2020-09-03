using VslAcademy.API.Models.Authentication;
using Microsoft.EntityFrameworkCore;
using VslAcademy.API.Models.MathSkills;
using System.Collections.Generic;

namespace DatingApp.Data
{
    public class DataContext : DbContext
    {
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {   
      
               
    } 
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<User> Users {get;set;}
        public DbSet<Role> Roles {get;set;}
        public DbSet<UserRoles> UserRoles {get;set;}
        public DbSet<Permission> Permissions {get;set;}
        public DbSet<RolePermissions> RolePermissions {get;set;}
        public DbSet<MathDomain> MathDomains {get;set;} 
        public DbSet<MathSubDomain> MathSubDomains {get;set;}
        public DbSet<MathSkill> MathSkills {get;set;}
        public DbSet<SchoolGrade> SchoolGrades {get;set;}
        public DbSet<SubDomainGradeMapping> SubDomainGradeMappings {get;set;}
         public DbSet<SkillGradeMapping> SkillGradeMappings {get;set;}
    }
}
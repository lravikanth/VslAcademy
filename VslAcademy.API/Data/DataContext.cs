using VslAcademy.API.Models.Authentication;
using Microsoft.EntityFrameworkCore;
namespace DatingApp.Data
{
    public class DataContext : DbContext
    {
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {   
    } 
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

        public DbSet<User> Users {get;set;}
        public DbSet<Roles> Roles {get;set;}
        public DbSet<UserRoles> UserRoles {get;set;}
        public DbSet<Permissions> Permissions {get;set;}
        public DbSet<RolePermissions> RolePermissions {get;set;}

    }
}
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore;
using API.Model;
using BackendCustoms.Model;

namespace API.DBContext
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        //public DbSet<LogModel> LogModels { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TokenModel> TokenModels { get; set; }
        public DbSet<SystemSetting> systemSettings { get; set; }
        public DbSet<CustomsData> CustomsDatas { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<GateModel>().Property(e => e.CreatedDate)
            // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            // // Adding the code below tells DB "NumericId is an AlternateKey and don't update".
            // // modelBuilder.Entity<CertificateModel>().Property(e => e.applicationNo)
            // // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}

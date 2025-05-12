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
        public DbSet<CeiridFromIRD> ceiridFromIRDs { get; set; }
        public DbSet<CeiridFromIRD_DeletedLog> ceiridFromIRD_DeletedLogs { get; set; }
        public DbSet<UserLog> UserLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<GateModel>().Property(e => e.CreatedDate)
            // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);

            // // Adding the code below tells DB "NumericId is an AlternateKey and don't update".
            // // modelBuilder.Entity<CertificateModel>().Property(e => e.applicationNo)
            // // .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
            modelBuilder.Entity<CustomsData>().Property(p => p.RF).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<CustomsData>().Property(p => p.CD).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<CustomsData>().Property(p => p.CT).HasColumnType("decimal(18,2)");
            modelBuilder.Entity<CustomsData>().Property(p => p.AT).HasColumnType("decimal(18,2)");
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Configuration;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GnamrDLLEF.Directories;

namespace GnamrDLLEF
{
    public class GnamrContext: DbContext
    {
        public GnamrContext(): base("gnamrConnection")
        { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            Database.SetInitializer<GnamrContext>(null);
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Search> Search { get; set; }
        public DbSet<id> Id { get; set; }
        public DbSet<names> Names { get; set; }

        public DbSet<adres> Adreses { get; set; }


        public DbSet<doc_type> DocTypes { get; set; }
        public DbSet<dbsours> Dbsourses { get; set; }
        public DbSet<gender> Genders{ get; set; }
        public DbSet<nation> Nationals { get; set; }
        public DbSet<places> Places { get; set; }
    }
}

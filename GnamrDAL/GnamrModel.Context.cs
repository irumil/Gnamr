﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace GnamrDAL
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class gnamrEntities : DbContext
    {
        public gnamrEntities()
            : base("name=gnamrEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<adres> adres { get; set; }
        public virtual DbSet<adres_fm> adres_fm { get; set; }
        public virtual DbSet<biomaterials> biomaterials { get; set; }
        public virtual DbSet<children> children { get; set; }
        public virtual DbSet<clc_diag> clc_diag { get; set; }
        public virtual DbSet<doc_inf> doc_inf { get; set; }
        public virtual DbSet<doze> doze { get; set; }
        public virtual DbSet<edb> edb { get; set; }
        public virtual DbSet<educated> educated { get; set; }
        public virtual DbSet<id> id { get; set; }
        public virtual DbSet<idead> idead { get; set; }
        public virtual DbSet<lgm> lgm { get; set; }
        public virtual DbSet<log> log { get; set; }
        public virtual DbSet<marriage> marriage { get; set; }
        public virtual DbSet<mylist> mylist { get; set; }
        public virtual DbSet<names> names { get; set; }
        public virtual DbSet<relat> relat { get; set; }
        public virtual DbSet<service_sql> service_sql { get; set; }
        public virtual DbSet<sich> sich { get; set; }
        public virtual DbSet<trades> trades { get; set; }
        public virtual DbSet<Search> Search { get; set; }
    }
}

//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class children
    {
        public Nullable<int> sysid { get; set; }
        public Nullable<int> id_marr { get; set; }
        public Nullable<byte> seq_no { get; set; }
        public int idchild { get; set; }
        public Nullable<System.DateTime> updt { get; set; }
        public int id { get; set; }
        public Nullable<int> id_relat { get; set; }
        public Nullable<byte> usr { get; set; }
        public Nullable<byte> usr_add { get; set; }
    
        public virtual marriage marriage { get; set; }
    }
}

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
    
    public partial class marriage
    {
        public marriage()
        {
            this.children = new HashSet<children>();
        }
    
        public Nullable<int> wife { get; set; }
        public Nullable<byte> seq_no { get; set; }
        public Nullable<System.DateTime> mardt { get; set; }
        public Nullable<int> husband { get; set; }
        public string src { get; set; }
        public Nullable<System.DateTime> updt { get; set; }
        public int id_marr { get; set; }
        public string number { get; set; }
        public string serial { get; set; }
        public string memo { get; set; }
        public Nullable<int> usr { get; set; }
        public Nullable<byte> usr_add { get; set; }
    
        public virtual ICollection<children> children { get; set; }
    }
}

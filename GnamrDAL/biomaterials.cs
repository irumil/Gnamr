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
    
    public partial class biomaterials
    {
        public int id { get; set; }
        public Nullable<int> sysid { get; set; }
        public Nullable<System.DateTime> dt { get; set; }
        public Nullable<int> bioMaterialId { get; set; }
        public Nullable<byte> availability { get; set; }
        public Nullable<int> number { get; set; }
        public string descrip { get; set; }
        public Nullable<System.DateTime> updt { get; set; }
        public Nullable<byte> usr { get; set; }
        public Nullable<byte> usr_add { get; set; }
    
        public virtual id id1 { get; set; }
    }
}
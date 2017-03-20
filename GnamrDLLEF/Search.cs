using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class Search
    {
            [Key]
            public int sysid { get; set; }
            public Nullable<byte> gender { get; set; }
            public string iin { get; set; }
            public string stat_src { get; set; }
            public Nullable<System.DateTime> stat_dt { get; set; }
            public Nullable<System.DateTime> updt { get; set; }
            public Nullable<byte> indelete { get; set; }
            public Nullable<System.DateTime> birthdt { get; set; }
            public Nullable<byte> usr_add { get; set; }
            public Nullable<byte> usr { get; set; }
            public string firstname { get; set; }
            public string lastname { get; set; }
            public string midlname { get; set; }
            public byte ind { get; set; }
    }
}

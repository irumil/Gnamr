using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class names
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public int sysid { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string midlname { get; set; }
        public byte ind { get; set; }
        public DateTime? updt { get; set; }
        
        public Nullable<int> usr { get; set; }
        public Nullable<byte> usr_add { get; set; }
        public Nullable<byte> type_doc { get; set; }

        //public virtual id id1 { get; set; }
    }
}

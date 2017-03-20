using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class id
    {
        [Key]
        public int sysid { get; set; }
        public byte? gender { get; set; }
        public string stat_src { get; set; }
        public DateTime? stat_dt { get; set; }
        
        public DateTime? updt { get; set; }
        public string iin { get; set; }
        public byte? usr { get; set; }
        public byte? idnational { get; set; }
        public byte? indelete { get; set; }
        public int? sysid_duble { get; set; }

        //[DataType(DataType.Date)] 
        //[DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        //[Column(TypeName = "Date")]
       // public DateTime? date { get; set;}

        [DataType(DataType.Date)]
        [Column(TypeName = "Date")]
        public DateTime? birthdt { get; set; }
        //public DateTime? date { get { if (date != null)  { return date.Value.Date;  }  else return null;  } set { date = value; } }
        public byte? usr_add { get; set; }
        public int? idFather { get; set; }
        public int? idMother { get; set; }
    }
}

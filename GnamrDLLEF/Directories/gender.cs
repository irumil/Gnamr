using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class gender
    {
        [Column("gender")]
        public int id { get; set; }

        [Column("descrip")]
        public string value{ get; set; }
        
    }
}

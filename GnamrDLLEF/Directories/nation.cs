using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class nation
    {
        [Column("idnational")]
        public int id { get; set; }

        [Column("descrip")]
        public string value { get; set; }

        public int? rating { get; set; }
    }
}

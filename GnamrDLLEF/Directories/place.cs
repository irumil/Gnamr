using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF.Directories
{
    public class places
    {
        [Column("idplace")]
        public int id { get; set; }

        public int? id_parent { get; set; }

        public string descrip { get; set; }

        public double? d_max { get; set; }
    }
}

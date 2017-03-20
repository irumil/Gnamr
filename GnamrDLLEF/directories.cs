using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    [NotMapped]
    public class directories
    {
        public List<doc_type> DocTypes { get; set; }
        public List<dbsours> Dbsourses { get; set; }
        public List<gender> Genders { get; set; }
        public List<nation> Nationals { get; set; }
    }
}

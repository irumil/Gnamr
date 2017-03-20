using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Migrations.Builders;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class dbsours
    {
        [Column("src")]
        public string id { get; set; }

        public string descrip { get; set; }

        [NotMapped]
        public string value 
        {
            get
            {
                return id;
            } 
            set { } 
        }
        
        public DateTime? updt { get; set; }
    }
}

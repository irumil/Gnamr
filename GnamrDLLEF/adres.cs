using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrDLLEF
{
    public class adres
    {
        public int id { get; set; }
        public int sysid { get; set; }
        public int? idplace { get; set; }
        public string street { get; set; }
        public byte? box { get; set; }
        public string housenmb { get; set; }
        public int? postalindex { get; set; }
        public string numbertel { get; set; }
        public DateTime? indt { get; set; }
        public DateTime? outdt { get; set; }
        public byte? doc_type { get; set; }
        public string src { get; set; }
        public byte? ind { get; set; }
        public DateTime? updt { get; set; }
        public int? usr { get; set; }
        public byte? usr_add { get; set; }
        public float? doze { get; set; }
        public short? room { get; set; }
      
    }
}

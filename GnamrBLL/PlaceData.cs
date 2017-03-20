using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GnamrBLL
{
    public class PlaceData
    {
        public int? parent { get; set; }

        public List<PlaceValue> data { get; set; }
    }

    public class PlaceValue
    {
        public int id { get; set; }
        public string value { get; set; }

        public double? d_max { get; set; }
        public bool webix_kids { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Web.Http;
using GnamrBLL;
using GnamrDLLEF;
using GnamrDLLEF.Directories;

namespace GnamrWebApp.Controllers
{
    public class PlacesController : ApiController
    {
        GnamrContext rep = new GnamrContext();

        public PlaceData Get(int? parent = null)
        {
            var placeValues = rep.Places.Where(x => x.id_parent == parent).
            Select(x => new PlaceValue()
            {
                id = x.id,
                value = x.descrip,
                d_max = x.d_max,
                webix_kids = rep.Places.Any(y => y.id_parent == x.id)
            }).ToList();

            var resultPlaceData = new PlaceData()
            {
                parent = parent,
                data = placeValues
            };

            return resultPlaceData;

        }
    }
}

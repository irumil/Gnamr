using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Web.Http;
using GnamrDLLEF;
using GnamrDLLEF.Directories;

namespace GnamrWebApp.Controllers
{
    public class PlacesController : ApiController
    {
        GnamrContext rep = new GnamrContext();

        public List<places> Get()
        {
            //if (idplace == null) return rep.Places.Where(x => x.id_parent == null).ToList(); else
            //return rep.Places.Where(x => x.id_parent == null).Select(x=>new {id = x.id, descrip = x.descrip}).ToList();
            var req = from s in rep.Places
                      where s.id_parent == null
                      select 
                      new
                      {
                          
                      }

            //<data parent  =" 0  " > <item   id ="  1 "  value ="  Layout branch "   state =" in progress "   hours =" 120 "  webix_kids  =" 1 " / > 
        
        } 
        public List<places> Get(int? parent)
        {
            if (parent == null) 
                return rep.Places.Where(x => x.id_parent == null).ToList();
            else
                return rep.Places.Where(x => x.id_parent == parent).ToList();
        }
    }
}

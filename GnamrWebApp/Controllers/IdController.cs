using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using GnamrDLLEF;


namespace GnamrWebApp.Controllers
{
    public class IdController : ApiController
    {
        
        GnamrContext rep = new GnamrContext();
       
        public List<id> Get(int sysid)
        {
            return rep.Id.Where(x => x.sysid == sysid).ToList();
        }
        
        
        public id Post([FromBody]id item)
        {
            rep.Entry(item).State = EntityState.Modified;
            rep.SaveChanges();
            return item;
        }

        
        public id Put([FromBody]id item)
        {
            rep.Entry(item).State = EntityState.Modified;
            rep.SaveChanges();
            return item;
        }

        public string Delete(int id)
        {
            return "Не удаляется";
        }
    }
}

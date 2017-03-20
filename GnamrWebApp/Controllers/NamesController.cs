using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GnamrDLLEF;


namespace GnamrWebApp.Controllers
{
    public class NamesController : ApiController
    {
        GnamrContext rep = new GnamrContext();
       

        public List<names> Get(int sysid)
        {
            return rep.Names.Where(x => x.sysid == sysid).ToList();
        }
        
        
        public names Post([FromBody]names item)
        {
            rep.Names.Add(item);
            rep.SaveChanges();
            return item;
        }

        
        public names Put(int id, [FromBody]names item)
        {
            rep.Entry(item).State = EntityState.Modified;
            rep.SaveChanges();
            return item;
        }

        
        public string Delete(int id)
        {
            var name = rep.Names.Find(id);
            rep.Names.Remove(name);
            rep.SaveChanges();

            return "Удалено";
        }
    }
}

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
    public class AdresesController : ApiController
    {
        GnamrContext rep = new GnamrContext();

        public List<adres> Get(int sysid)
        {
            return rep.Adreses.Where(x => x.sysid == sysid).ToList();
        }


        public adres Post([FromBody]adres item)
        {
            rep.Adreses.Add(item);
            rep.SaveChanges();
            return item;
        }


        public adres Put(int id, [FromBody]adres item)
        {
            rep.Entry(item).State = EntityState.Modified;
            rep.SaveChanges();
            return item;
        }


        public string Delete(int id)
        {
            var name = rep.Adreses.Find(id);
            rep.Adreses.Remove(name);
            rep.SaveChanges();

            return "Удалено";
        }
    }
}

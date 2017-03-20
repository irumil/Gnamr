using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using GnamrBLL;
using GnamrDLLEF;

namespace GnamrWebApp.Controllers
{
    public class Last50Controller : ApiController
    {
        public List<Search> Get()
        {
            return GnamrBLL.Repository.GetLast50();
        }
    }
}

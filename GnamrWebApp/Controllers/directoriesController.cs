using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using GnamrBLL;
using GnamrDLLEF;

namespace GnamrWebApp.Controllers
{
    public class DirectoriesController : ApiController
    {
       
        public directories Get()
        {
            return Repository.GetDirectorieses();
        }
    }
}

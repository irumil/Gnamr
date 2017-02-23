using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using GnamrBLL;
using GnamrDAL;

namespace GnamrWebApp.Controllers
{
    public class SearchController : ApiController
    {
        public List<Search> Get(string searchText, string param)
        {
            JavaScriptSerializer js = new JavaScriptSerializer();
            var paramObj = js.Deserialize<FindModel>(param);

            return GnamrBLL.Repository.Search(searchText, paramObj);
        }
    }
}

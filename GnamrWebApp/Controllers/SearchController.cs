using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Script.Serialization;
using GnamrBLL;
using GnamrDLLEF;


namespace GnamrWebApp.Controllers
{
    public class SearchController : ApiController
    {
        public List<Search> Get([ModelBinder] FindModel param)
        {
            //JavaScriptSerializer js = new JavaScriptSerializer();
            //var paramObj = js.Deserialize<FindModel>(param);
            if (param.TextSearch != "" || param.TextSearch != String.Empty || param.TextSearch!= null) 
                return GnamrBLL.Repository.Search(param);
            else
                return GnamrBLL.Repository.GetLast50();
        }
    }
}

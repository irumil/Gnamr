using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using GnamrDLLEF;
using Helpers;

namespace GnamrBLL
{
    public class Repository
    {
        public static GnamrContext Context = new GnamrDLLEF.GnamrContext();

        public static List<Search> Search(FindModel param)
        {
            IEnumerable<Search> result = new List<Search>{new Search(){firstname = "Нет данных"}};

            if (param.TextSearch == String.Empty) return result.ToList();

            int sysid = 0;
            bool isSysid = Int32.TryParse(param.TextSearch, out sysid);

            //если в строке число
            if (isSysid) result = GetBySysid(sysid);
            else
            
            //если диапазон
            if (param.TextSearch.Contains("-")) result = GetIntervalSysid(param.TextSearch);
            else
            //если список
            if (param.TextSearch.Contains(",")) result = GetListSysid(param.TextSearch);
            else

            //если нет пробела
            if (!param.TextSearch.Contains(" ")) result = GetByName(param.TextSearch, param);
            else

            //если два слова
            if (param.TextSearch.Contains(" ")) result = GetByNames(param.TextSearch, param);
            

            return result.ToList();
        }

        private static IQueryable<Search> GetListSysid(string text)
        {
            var sysids = HelpersFunction.GetIntFromStringByComma(text);
            return Context.Search.Where(s => sysids.Contains(s.sysid));
        }

        private static IQueryable<Search> GetIntervalSysid(string text)
        {
            var first = HelpersFunction.GetIntFromStringByDefis(text)[0];
            var second = HelpersFunction.GetIntFromStringByDefis(text)[1];
            
            return Context.Search.Where(s => s.sysid >= first & s.sysid <= second);
        }

        private static IEnumerable<Search> GetByNames(string text, FindModel param)
        {
            var name0 = HelpersFunction.GetStringsBySpace(text)[0];
            var name1 = HelpersFunction.GetStringsBySpace(text)[1];

            IQueryable<Search> result;
            if (param.MatchEndings)
              result = Context.Search.Where(x => (x.firstname.Contains(name0) & x.lastname.Contains(name1)) 
                  | (x.firstname.Contains(name1) & x.lastname.Contains(name0)) );
            else 
              result = Context.Search.
                Where(x => (x.firstname == name0 & x.lastname == name1) | (x.firstname == name1 & x.lastname == name0) );
            return result;
        }

        private static IQueryable<Search> GetByName(string text, FindModel param)
        {
            IQueryable<Search> result;

            if (param.MatchEndings)
                result = Context.Search.Where(x => (x.firstname.Contains(text) | x.lastname.Contains(text)));
            else
                result = Context.Search.Where(x => (x.firstname == text | x.lastname == text));
            return result;
        }

        private static IQueryable<Search> GetBySysid(int sysid)
        {
            IQueryable<Search> result = Context.Search.Where(x => x.sysid == sysid);
            return result;
        }

        public static List<Search> GetLast50()
        {
            var result = Context.Search.OrderByDescending(x=>x.sysid).Take(50).ToList();
            return result;
        }

        public static directories  GetDirectorieses()
        {
            var direcotries = new directories
            {
                DocTypes = Context.DocTypes.ToList(),
                Dbsourses = Context.Dbsourses.ToList(),
                Nationals = Context.Nationals.OrderByDescending(x=>x.rating).ToList(),
                Genders = Context.Genders.ToList()
            };


            return direcotries;
        }
        /*
        public static Id Get(int sysid)
        {
            var re = (from i in Context.id
                where i.sysid == sysid 
                select i).First();
            //var result = Context.id.Find(sysid);
            return re;
        }

        public static List<names> GetNames(int sysid)
        {

            
            //Context.ContextOptions.LazyLoadingEnabled = true;

            var result = Context.names.Where(x => x.sysid == sysid).ToList();
            return result;
        }*/
    }
}

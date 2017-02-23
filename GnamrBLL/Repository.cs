using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Common.CommandTrees;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using GnamrDAL;
using Helpers;

namespace GnamrBLL
{
    public class Repository
    {
        public static gnamrEntities Context = new gnamrEntities();

        public static List<Search> Search(string text, FindModel param)
        {
            IEnumerable<Search> result = new List<Search>{new Search(){firstname = "Нет данных"}};
            
            if (text == String.Empty) return result.ToList();

            int sysid = 0;
            bool isSysid = Int32.TryParse(text, out sysid);

            //если в строке число
            if (isSysid) result = GetBySysid(sysid);
            else
            
            //если диапазон
            if (text.Contains("-")) result = GetIntervalSysid(text);
            else
            //если список
            if (text.Contains(",")) result = GetListSysid(text);
            else

            //если нет пробела
            if (!text.Contains(" ")) result = GetByName(text, param);
            else

            //если два слова
            if (text.Contains(" ")) result = GetByNames(text, param);
            

            return result.ToList();
        }

        private static IEnumerable<Search> GetListSysid(string text)
        {
            var sysids = HelpersFunction.GetIntFromStringByComma(text);
            return Context.Search.Where(s => sysids.Contains(s.sysid));
        }

        private static IEnumerable<Search> GetIntervalSysid(string text)
        {
            var first = HelpersFunction.GetIntFromStringByDefis(text)[0];
            var second = HelpersFunction.GetIntFromStringByDefis(text)[1];
            
            return Context.Search.Where(s => s.sysid >= first & s.sysid <= second);
        }

        private static IEnumerable<Search> GetByNames(string text, FindModel param)
        {
            var name0 = HelpersFunction.GetStringsBySpace(text)[0];
            var name1 = HelpersFunction.GetStringsBySpace(text)[1];

            IEnumerable<Search> result;
            if (param.MatchEndings)
              result = Context.Search.Where(x => (x.firstname.Contains(name0) & x.lastname.Contains(name1)) 
                  | (x.firstname.Contains(name1) & x.lastname.Contains(name0)) );
            else 
              result = Context.Search.
                Where(x => (x.firstname == name0 & x.lastname == name1) | (x.firstname == name1 & x.lastname == name0) );
            return result;
        }

        private static IEnumerable<Search> GetByName(string text, FindModel param)
        {
            
            IEnumerable<Search> result;

            if (param.MatchEndings)
                result = Context.Search.Where(x => (x.firstname.Contains(text) | x.lastname.Contains(text)));
            else
                result = Context.Search.Where(x => (x.firstname == text | x.lastname == text));
            return result;
        }

        private static IEnumerable<Search> GetBySysid(int sysid)
        {
            IEnumerable<Search> result = Context.Search.Where(x=>x.sysid == sysid);
            return result;
        }

        public static List<Search> GetLast50()
        {
            var result = Context.Search.OrderByDescending(x=>x.sysid).Take(50).ToList();
            return result;
        }
    }
}

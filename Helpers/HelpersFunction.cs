using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helpers
{
    public class HelpersFunction
    {
        public static int[] GetIntFromStringByDefis(string text)
        {
            var interval = text.Split(new char[] { '-' }, StringSplitOptions.RemoveEmptyEntries);

            int firstSysid = 0;
            int secondSysid = 0;

            
            int.TryParse(interval[0], out firstSysid);
            int.TryParse(interval[1], out secondSysid);

            return new[] {firstSysid,secondSysid};
        }
        public static int[] GetIntFromStringByComma(string text)
        {
            var listSysid = text.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);

            //может имеет смысл использовать не массив а список
            int[] sysids = new int[1000];
            int i = 0;
            var intSysid = 0;

            foreach (string sysid in listSysid)
            {
                int.TryParse(sysid, out intSysid);
                sysids[i] = intSysid;
                i += 1;
            }

            return sysids;
        }

        /// <summary>
        /// Преобразует строку из слов разделенных пробелами в массив строк
        /// </summary>
        /// <param name="text">Входящая строка</param>
        /// <returns>Возвращает массив строк</returns>
        public static string[] GetStringsBySpace(string text)
        {
            var listNames = text.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            
            return listNames;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestGnamrConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {

            var res = GnamrBLL.Repository.Get(1);

            foreach (var re in res.adres)
            {
                Console.WriteLine(re.idplace);
            }
            

            Console.ReadLine();

        }
    }
}

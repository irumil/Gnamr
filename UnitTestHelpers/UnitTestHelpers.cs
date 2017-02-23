using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Helpers;


namespace UnitTestHelpers
{
    [TestClass]
    public class UnitTestHelpers
    {
        [TestMethod]
        public void TestGetIntFromStringByDefis()
        {
            string text = "100-1000";
            int[] arrText = new[] {100, 1000};
            

            var result = HelpersFunction.GetIntFromStringByDefis(text);

            Assert.AreEqual(arrText[0], result[0]);
            Assert.AreEqual(arrText[1], result[1]);
        }

        [TestMethod]
        public void GetIntFromStringByComma()
        {
            string text = "100,101,102,110";
            int[] arrText = new[] {100,101,102,110};


            var result = HelpersFunction.GetIntFromStringByComma(text);

            Assert.AreEqual(arrText[0], result[0]);
            Assert.AreEqual(arrText[3], result[3]);
        }

        [TestMethod]
        public void GetStringsBySpace()
        {
            string text = "ИВАНОВ ИВАН";
            string[] arrText = new[] {"ИВАНОВ", "ИВАН"};


            var result = HelpersFunction.GetStringsBySpace(text);

            Assert.AreEqual(arrText[0], result[0]);
            Assert.AreEqual(arrText[1], result[1]);
        }

    }
}

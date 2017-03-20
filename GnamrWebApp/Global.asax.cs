using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace GnamrWebApp
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        public class MyDateTimeConvertor : DateTimeConverterBase
        {
            public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
            {
                return DateTime.Parse(reader.Value.ToString());
            }

            public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
            {
                writer.WriteValue(((DateTime)value).ToString("dd.MM.yyyy hh:mm"));
            }
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            JsonMediaTypeFormatter jsonFormatter = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            JsonSerializerSettings jSettings = new Newtonsoft.Json.JsonSerializerSettings()
            {
                Formatting = Formatting.Indented,
                DateTimeZoneHandling = DateTimeZoneHandling.Utc
            };
            jSettings.Converters.Add(new MyDateTimeConvertor());
            jsonFormatter.SerializerSettings = jSettings;
        }
    }
}

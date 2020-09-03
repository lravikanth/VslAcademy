using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using Serilog;

namespace VslAcademy.API.Helpers
{
      public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message )
        {
            Log.Information("In response extension method");
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
            response.Headers.Add("Access-Control-allow-origin","*");
        }
        public static int CalculateAge(this DateTime response) {
            int age = DateTime.Now.Year - response.Year;
            if (response.AddYears(age) > DateTime.Now)
                age--;

                return age;

        }

        public static void AddPagination(this HttpResponse response, int currentPage,
                        int itemsPerPage, int totalItems,int totalPages ) {
            var paginationHeader = new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);        
            var camelCaseFormatter = new JsonSerializerSettings(); 
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();    
            response.Headers.Add("Pagination",JsonConvert.SerializeObject(paginationHeader,camelCaseFormatter));   
            response.Headers.Add("Access-Control-Expose-Headers","Pagination");

        }
    }
}
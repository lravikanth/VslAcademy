using Microsoft.AspNetCore.Http;

namespace VslAcademy.API.Dtos.MathSkills
{
    public class ImageUploadForQuestion
    {
        public int questionId { get; set; }
         public IFormFile file {get; set;}

    }
}
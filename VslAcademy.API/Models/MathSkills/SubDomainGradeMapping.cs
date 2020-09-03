using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.MathSkills
{
    public class SubDomainGradeMapping
    {
        public int Id { get; set; }
        public int SubdomainId { get; set; }
        public int GradeId { get; set; }

    }
} 
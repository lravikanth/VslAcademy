using System.Collections.Generic;
using VslAcademy.API.Models.MathSkills;

namespace VslAcademy.API.Dtos.MathSkills
{
    public class ReceiveSubdomainGradeMappingDto
    {
        public  string subDomain { get; set; }
        public int domainId {get; set;}
        public List<SubDomainGradeMapping> gradeMapping {get; set;}
    }
}
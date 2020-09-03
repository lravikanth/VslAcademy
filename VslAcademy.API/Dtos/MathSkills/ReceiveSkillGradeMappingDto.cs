using System.Collections.Generic;
using VslAcademy.API.Models.MathSkills;

namespace VslAcademy.API.Dtos.MathSkills
{
    public class ReceiveSkillGradeMappingDto
    {
        public  int id { get; set; }
        public  string skillName { get; set; }

        public int subDomainId {get; set;}
        public List<SkillGradeMapping> gradeMapping {get; set;}
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.MathSkills
{
    public class MathSkill
    {
         public int Id { get; set; }
        public int MathSubDomainId { get; set; }
        public string SkillName { get; set; }
        public DateTime? CreatedDate  { get; set; }
        public int? CreatedBy  { get; set; }
        public DateTime? UpdatedDate  { get; set; }
        public int? UpdatedBy  { get; set; }
          [ForeignKey("SkillId")]
        public List<SkillGradeMapping>? GradeMapping {get; set;}
    }
}
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.MathSkills
{
    public class MathSubDomain
    {
       
        public int Id { get; set; }
        public int MathDomainId { get; set; }
        public string SubDomain { get; set; }
        public DateTime CreatedDate  { get; set; }
        public int CreatedBy  { get; set; }
        public DateTime UpdatedDate  { get; set; }
        public int UpdatedBy  { get; set; }
         
         [ForeignKey("SubdomainId")]
        public List<SubDomainGradeMapping> GradeMapping {get; set;}
    }
}
using System;
using System.Collections.Generic;

namespace VslAcademy.API.Models.MathSkills
{
    public class MathDomain
    {
        public int Id { get; set; }
        public string Domain { get; set; }
        public DateTime CreatedDate  { get; set; }
        public int CreatedBy  { get; set; }
        public DateTime UpdatedDate  { get; set; }
        public int UpdatedBy  { get; set; }

        public List<MathSubDomain> MathSubDomains {get; set;}

    }
}
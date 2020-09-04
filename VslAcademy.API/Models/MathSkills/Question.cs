using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace VslAcademy.API.Models.MathSkills
{
    public class Question
    {
        public int Id { get; set; }
        public string QuestionType { get; set; }
        public int DifficultyScore { get; set; }
        public string TopText { get; set; }
        public string ActualText { get; set; }
        public string BelowText { get; set; }
        public string Url { get; set; }

        public int SkillGradeMappingId {get; set;}
        public string LateX { get; set; }
        
        [ForeignKey("Answers")]
        public int? AnswerId {get; set;}
        
        public Answer Answer {get; set;}
        public DateTime? CreatedDate  { get; set; }
        public int? CreatedBy  { get; set; }
        public DateTime? UpdatedDate  { get; set; }
        public int? UpdatedBy  { get; set; }
    }
}
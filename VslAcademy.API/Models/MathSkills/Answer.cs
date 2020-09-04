using System;

namespace VslAcademy.API.Models.MathSkills
{
    public class Answer
    {
       public int Id { get; set; } 
      public string TopText { get; set; } 
       public string AnswerType { get; set; } 
       public string Opt1 { get; set; } 
       public string Opt2 { get; set; } 
       public string Opt3 { get; set; } 
       public string Opt4 { get; set; } 
       public string BottomText { get; set; } 
       public string RightAnswer { get; set; } 
       public DateTime? CreatedDate  { get; set; }
       public int? CreatedBy  { get; set; }
       public DateTime? UpdatedDate  { get; set; }
       public int? UpdatedBy  { get; set; }
    }
}
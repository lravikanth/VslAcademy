using System;

namespace VslAcademy.API.Dtos.MathSkills
{
    public class ReceiveAnswersDto
    {
       public int Id { get; set; } 
       public int? QuestionId { get; set; } 
       public string TopText { get; set; } 
       public string AnswerType { get; set; } 
       public string Opt1 { get; set; } 
       public string Opt2 { get; set; } 
       public string Opt3 { get; set; } 
       public string Opt4 { get; set; } 
       public string BottomText { get; set; } 
       public string RightAnswer { get; set; } 
    }
}
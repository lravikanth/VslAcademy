using System;
using System.Security.Claims;

namespace VslAcademy.API.Dtos.MathSkills
{
    public class ReceiveQuestionDto
    {
        public int Id { get; set; }
        public string QuestionType { get; set; }
        public int DifficultyScore { get; set; }
        public string TopText { get; set; }
        public string? ActualText { get; set; }
        public string? BelowText { get; set; }
        public string? Url { get; set; }
        public string? LateX { get; set; }

        public ReceiveAnswersDto Answer {get; set;}
    }
}
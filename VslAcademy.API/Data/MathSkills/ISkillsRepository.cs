using System.Collections.Generic;
using System.Threading.Tasks;
using VslAcademy.API.Models.MathSkills;

namespace VslAcademy.API.Data.MathSkills
{
    public interface ISkillsRepository
    {
        void Add<T>(T entity)  where T:class;
         void Delete<T>(T entity)  where T:class;
         Task<bool> SaveAll();
         Task<List<MathDomain>> GetDomains();
         Task<List<MathSkill>> GetSkills(int SubDomainId, int GradeId);

        Task<MathDomain> GetDomain(int domainId);
        Task<MathSubDomain> GetSubDomain(int SubDomainId);

        Task<MathSkill> GetSkill(int SkillId);

        Task<Question> GetQuestion(int questionId);
        Task<List<Question>> GetQuestions(int skillGradeMappingId);
         Task<List<SchoolGrade>> GetSchoolGrades();

         Task<List<MathSubDomain>> GetSubDomains(int DomainId, int GradeId);
    }
}
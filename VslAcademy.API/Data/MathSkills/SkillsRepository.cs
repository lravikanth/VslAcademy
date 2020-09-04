using System.Threading.Tasks;
using DatingApp.Data;
using VslAcademy.API.Models.MathSkills;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace VslAcademy.API.Data.MathSkills
{
    public class SkillsRepository : ISkillsRepository
    {
        private readonly DataContext _context;
        public SkillsRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext Context { get; }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<MathDomain> GetDomain(int domainId)
        {
           return await _context.MathDomains.FirstOrDefaultAsync(obj => obj.Id == domainId);
        }

        public async Task<List<MathDomain>> GetDomains()
        {
            return await _context.MathDomains.Include(p => p.MathSubDomains).ToListAsync();
        }


        public async Task<MathSkill> GetSkill(int SkillId)
        {
            return await _context.MathSkills.Include(p => p.GradeMapping).FirstOrDefaultAsync(obj => obj.Id == SkillId);
        }

        public async Task<List<MathSkill>> GetSkills(int SubDomainId,int GradeId)
        {
            return await _context.MathSkills.Include(p=> p.GradeMapping).
            Where(p => p.MathSubDomainId == SubDomainId && p.GradeMapping.Any(g => g.GradeId == GradeId)).ToListAsync();
        }

        public async Task<MathSubDomain> GetSubDomain(int SubDomainId)
        {
            return await _context.MathSubDomains.Include(p => p.GradeMapping).FirstOrDefaultAsync(obj => obj.Id == SubDomainId);
        }

        public async Task<List<SchoolGrade>> GetSchoolGrades()
        {
            return await _context.SchoolGrades.ToListAsync();
        }

        public async Task<List<MathSubDomain>> GetSubDomains(int DomainId, int GradeId)
        {
            return await _context.MathSubDomains.Include(p => p.GradeMapping).
            Where(q => q.MathDomainId == DomainId && q.GradeMapping.Any(g => g.GradeId == GradeId)).ToListAsync();
           
        }

        public async Task<Question> GetQuestion(int questionId)
        {
           return await _context.Questions.Include(p => p.Answer).FirstOrDefaultAsync(obj => obj.Id == questionId);
        }

        public async Task<List<Question>> GetQuestions(int skillGradeMappingId)
        {
            return await _context.Questions.Include(p => p.Answer).Where(q => q.SkillGradeMappingId == skillGradeMappingId).ToListAsync();
        }
    }
}
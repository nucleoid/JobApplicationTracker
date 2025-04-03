using JobApplicationTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace JobApplicationTracker.Repository
{
    public interface IApplicationRepository
    {
        Task<List<Application>> GetAllAsync();
        Task<Application?> GetByIdAsync(int id);
        Task<Application> AddAsync(Application app);
        Task UpdateAsync(Application app);
        Task DeleteAsync(Application app);
    }


    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationDbContext _context;
        public ApplicationRepository(ApplicationDbContext context) => _context = context;

        public async Task<List<Application>> GetAllAsync() => await _context.Applications.ToListAsync();
        public async Task<Application?> GetByIdAsync(int id) => await _context.Applications.FindAsync(id);
        public async Task<Application> AddAsync(Application app)
        {
            app.DateApplied = DateTime.UtcNow;
            _context.Applications.Add(app);
            await _context.SaveChangesAsync();
            return app;
        }
        public async Task UpdateAsync(Application app)
        {
            _context.Applications.Update(app);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Application app)
        {
            _context.Applications.Remove(app);
            await _context.SaveChangesAsync();
        }
    }
}

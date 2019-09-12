using System.Threading.Tasks;
using DailyInEx.API.Core.Repositories;

namespace DailyInEx.API.Persistence.Repositories
{
    public class CommonRepository : ICommonRepository
    {
        private readonly DataContext _context;

        public CommonRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
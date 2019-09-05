using Microsoft.EntityFrameworkCore;

namespace DailyInEx.API.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        
    }
}
using Microsoft.EntityFrameworkCore;
using Models; // or your actual namespace
namespace Data;
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Note> Notes => Set<Note>();
}

using Microsoft.EntityFrameworkCore;
using Models; // adjust this based on your project structure
using Data;    // namespace where AppDbContext is

var builder = WebApplication.CreateBuilder(args);

// 1. Add CORS services with a policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Allow this origin
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// 2. Add services to the container
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 3. Configure EF Core with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// This is for creating the database migrations
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    context.Database.Migrate();
}

// 4. Middleware
app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


// 6. Add POST endpoint to store Note data
app.MapPost("/notes", async (Note note, AppDbContext db) =>
{
    db.Notes.Add(note);
    await db.SaveChangesAsync();
    return Results.Created($"/notes/{note.Id}", note);
});

// 7. Optional: GET endpoint to retrieve all notes
app.MapGet("/notes", async (AppDbContext db) =>
    await db.Notes.ToListAsync()
);

app.Run();

// Record for weatherforecast
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

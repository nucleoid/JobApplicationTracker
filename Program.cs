using JobApplicationTracker.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(opt =>
    opt.UseSqlite(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularClient", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// 👇 Add this
app.UseCors("AllowAngularClient");

app.UseAuthorization();
app.MapControllers();
app.Run();
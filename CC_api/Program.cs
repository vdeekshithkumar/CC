using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DbContext>(options =>
   options.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection")));
var Configuration = builder.Configuration;
// Add services to the container.

AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

builder.Services.AddControllers();

ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
  options.AddDefaultPolicy(
  builder =>
  {
    builder.AllowAnyOrigin()
   .AllowAnyHeader()
   .AllowAnyMethod();
  });
});
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}



app.UseHttpsRedirection();



app.UseAuthorization();
app.UseCors();
app.MapControllers();



app.Run();

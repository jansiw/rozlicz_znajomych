using Microsoft.EntityFrameworkCore;
using RozliczZnajomych.Server.Repositories;
using RozliczZnajomych.Server.Services;
using RozliczZnajomych.Server.DataAccess;
using RozliczZnajomych.Server.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
builder.Services.AddScoped<ILoginRepository, DataBaseLoginRepository>();
builder.Services.AddTransient<ILoginService, LoginService>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connection = String.Empty;
if (builder.Environment.IsDevelopment())
{
    builder.Configuration.AddEnvironmentVariables().AddJsonFile("appsettings.Development.json");
    connection = builder.Configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");
}
else
{
    connection = Environment.GetEnvironmentVariable("AZURE_SQL_CONNECTIONSTRING");
}
//builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddCors(opt =>
{
    opt.AddPolicy("FrontEndClient", corsPolicyBuilder => corsPolicyBuilder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .SetIsOriginAllowed(_ => true)
        .AllowCredentials());
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        connection,
        new MySqlServerVersion(new Version(8, 0)), // Zmie� wersj� na odpowiedni� dla Twojej instalacji MySQL
        mySqlOptions =>
        {
            mySqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5, // Maksymalna liczba ponownych pr�b
                maxRetryDelay: TimeSpan.FromSeconds(10), // Maksymalny czas oczekiwania pomi�dzy pr�bami
                errorNumbersToAdd: null // Opcjonalna lista dodatkowych numer�w b��d�w, kt�re maj� by� obs�ugiwane jako przej�ciowe
            );
        }
    ));
var app = builder.Build();
app.UseCors("FrontEndClient");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

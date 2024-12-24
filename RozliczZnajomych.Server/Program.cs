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
        new MySqlServerVersion(new Version(8, 0)), // Zmieñ wersjê na odpowiedni¹ dla Twojej instalacji MySQL
        mySqlOptions =>
        {
            mySqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5, // Maksymalna liczba ponownych prób
                maxRetryDelay: TimeSpan.FromSeconds(10), // Maksymalny czas oczekiwania pomiêdzy próbami
                errorNumbersToAdd: null // Opcjonalna lista dodatkowych numerów b³êdów, które maj¹ byæ obs³ugiwane jako przejœciowe
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

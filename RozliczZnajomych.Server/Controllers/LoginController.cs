using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RozliczZnajomych.Server.Models;
using RozliczZnajomych.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace RozliczZnajomych.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }
        [HttpPost]
        public IActionResult AddUser([FromBody] Account account)
        {
            string result = _loginService.AddUser(account);
            if (result =="Uzytkownik zostal pomyslnie dodany")
            {
                return Ok(result);
            }
            return Conflict(result);
        }
        [HttpPost]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            if (_loginService.CheckUserCredentials(request.Username, request.Password))
            {
                var token = _loginService.GenerateToken(request.Username);
                return Ok(new { Token = token });
            }
            return Unauthorized("Invalid username or password.");
        }
        [HttpGet]
        public IActionResult CheckToken(string token)
        {
            var claimsPrincipal = _loginService.ValidateToken(token);
            if (claimsPrincipal != null)
            {
                var username = claimsPrincipal.FindFirst(ClaimTypes.Name)?.Value;
                var userIdClaim = claimsPrincipal.FindFirst("userId")?.Value;
                if (username != null && int.TryParse(userIdClaim, out var userId))
                {
                    return Ok(new
                    {
                        Message = "Token is valid.",
                        Username = username,
                        UserId = userId
                    });
                }
            }
            return Unauthorized("Invalid or expired token.");
        }
        [HttpPatch]
        public IActionResult UpdateUser (string username, string password, string user)
        {
            _loginService.UpdateUser(username, password,user);
            return Ok();
            
        }
        [HttpPatch]
        public IActionResult UpdatePassword(string username, string password)
        {
            _loginService.UpdateUser(username, password,username);
            return Ok();
        }
        [HttpPatch]
        public IActionResult UpdateUsername(string username, string user)
        {
            _loginService.UpdateUsername(username, user);
            return Ok();
        }
    }
}

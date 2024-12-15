using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RozliczZnajomych.Server.Models;
using RozliczZnajomych.Server.Services;

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
            _loginService.AddUser(account);
            return Ok();
        }
        [HttpGet]
        public IActionResult CheckUser(string username,string password)
        {
            if( _loginService.CheckUserCredentials(username, password))
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}

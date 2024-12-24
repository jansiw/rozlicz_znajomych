using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using RozliczZnajomych.Server.Models;
using RozliczZnajomych.Server.Repositories;
using RozliczZnajomych.Server.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace RozliczZnajomych.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : ControllerBase
    {
        private readonly ILoginRepository _repository;

        public UserController(ILoginRepository repository)
        {
            _repository = repository;
        }
        [HttpGet("profile-picture/{userId}")]
        public IActionResult GetProfilePicture(int userId)
        {
            var profilePicture = _repository.GetProfilePicture(userId);

            if (profilePicture == null)
            {
                return NotFound("Profile picture not found.");
            }

            return File(profilePicture, "image/jpeg"); // Zwracamy dane obrazu w formacie JPEG
        }
        [HttpPost("profile-picture/{userId}")]
        public IActionResult UploadProfilePicture(int userId, IFormFile profilePicture)
        {
            if (profilePicture == null || profilePicture.Length == 0)
            {
                return BadRequest("Invalid file.");
            }

            using (var ms = new MemoryStream())
            {
                profilePicture.CopyTo(ms);
                var pictureBytes = ms.ToArray();

                var user = _repository.GetUserById(userId); // Zakładamy, że masz tę metodę w repozytorium
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                user.ProfilePicture = pictureBytes;
                _repository.UpdatePicture(user); // Zakładamy, że masz tę metodę do aktualizacji użytkownika

                return Ok("Profile picture updated successfully.");
            }
        }
    }
}

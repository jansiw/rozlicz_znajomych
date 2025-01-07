
using Microsoft.AspNetCore.Mvc;
using RozliczZnajomych.Server.DataAccess;
using RozliczZnajomych.Server.Models;
using System.Linq;

namespace RozliczZnajomych.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FriendsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public FriendsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpPost("Add")]
        public IActionResult AddFriend(string requesterName, string addresseeName)
        {

            var friend = new Friend { RequesterName = requesterName, AddresseeName = addresseeName, Accepted = false };
            _db.Add(friend);
            _db.SaveChanges();
            return Ok(friend);
        }

        [HttpPost("Accept")]
        public IActionResult AcceptFriend(string friendName, string username)
        {
            var friend = _db.Set<Friend>().FirstOrDefault(f => f.RequesterName == friendName && f.AddresseeName == username);
            if (friend == null) return NotFound();

            // Ensure this user is the one who should accept the friendship
            if (friend.AddresseeName != username) return Unauthorized();

            friend.Accepted = true;
            _db.SaveChanges();
            return Ok(friend);
        }

        [HttpGet("List/{username}")]
        public IActionResult ListFriends(string username)
        {
            var items = _db.Set<Friend>()
                .Where(f => (f.RequesterName == username || f.AddresseeName == username) && f.Accepted)
                .ToList();
            return Ok(items);
        }
        [HttpDelete("{friendname}")]
        public IActionResult RemoveFriend(string friendname)
        {
        var friend = _db.Set<Friend>().Find(friendname);
        if (friend == null) return NotFound();

        _db.Remove(friend);
        _db.SaveChanges();
        return Ok();
        }
    }
}
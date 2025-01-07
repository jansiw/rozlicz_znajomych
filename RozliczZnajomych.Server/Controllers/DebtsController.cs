using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RozliczZnajomych.Server.DataAccess;
using RozliczZnajomych.Server.Models;
using System.Linq;

namespace RozliczZnajomych.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class DebtsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;

        public DebtsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllDebts()
        {
            var debts = _dbContext.Set<Debts>().ToList();
            return Ok(debts);
        }

       [HttpGet("{creditor}")]
       public IActionResult GetDebtsByCreditor(string creditor){
              var debts = _dbContext.Set<Debts>().Where(d => d.Creditor == creditor).ToList();
              return Ok(debts); 
       }

         [HttpGet("{debtor}")]
         public IActionResult GetDebtsByDebtor(string debtor){
                  var debts = _dbContext.Set<Debts>().Where(d => d.Debtor == debtor).ToList();
                  return Ok(debts);
         }

        [HttpPost]
        public IActionResult AddDebt(string creditor, string debtor, int amount)
        {
            var debt = new Debts { Creditor = creditor, Debtor = debtor, Amount = amount };
            if (debt == null)
            {
                return BadRequest("Invalid debt data.");
            }

            _dbContext.Set<Debts>().Add(debt);
            _dbContext.SaveChanges();
            return Ok(debt);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDebt(int id, decimal amount)
        {
            var debt = _dbContext.Set<Debts>().FirstOrDefault(d => d.Id == id);
            if (debt == null)
            {
                return NotFound();
            }

            debt.Amount = amount;
            _dbContext.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDebt(int id)
        {
            var debt = _dbContext.Set<Debts>().FirstOrDefault(d => d.Id == id);
            if (debt == null)
            {
                return NotFound();
            }

            _dbContext.Set<Debts>().Remove(debt);
            try
            {
                _dbContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict("The debt was modified or deleted by another process.");
            }
            return NoContent();
        }
    }
}
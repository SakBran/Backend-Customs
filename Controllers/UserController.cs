using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : BaseAPIController<User>
    {
        private readonly ApplicationDbContext _context;
        public UserController(ApplicationDbContext context) : base(context)
        {
            _context = context;
        }

        [HttpPut("ToggleActive/{id}")]
        public async Task<ActionResult<User>> ToggleActive(string id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            // only open if you need to change the status of the user to active 
            // if (string.IsNullOrEmpty(user.IsActive) || user.IsActive == null)
            // {
            //     user.IsActive = "True";
            // }

            // for active and deactivation 
            if (user.IsActive == "True")
            {
                user.IsActive = "False";
            }
            else if (user.IsActive == "False")
            {
                user.IsActive = "True";
            }



            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [Authorize]
        [HttpPost]
        public override async Task<ActionResult<User>> PostData(User data)
        {

            await _context.AddAsync(data);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetData", new { }, data);
        }
    }
}
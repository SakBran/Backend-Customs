using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DBContext;
using BackendCustoms.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendCustoms.Controllers.IRD
{
    [ApiController]
    [Route("api/[controller]")]
    public class IRDController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public IRDController(ApplicationDbContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpPost("/api/verificationConfirmation")]
        public async Task<IActionResult> verificationConfirmation(string ceirId)
        {
            try
            {
                var data = new CeiridFromIRD
                {
                    CEIRID = ceirId,
                    ReceivedDatetime = DateTime.Now,
                    IsSent = false,
                    SendDatetime = null
                };
                await _context.ceiridFromIRDs.AddAsync(data);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
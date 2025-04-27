using System;
using System.Threading.Tasks;
using API.Controllers.Auth.Request;
using API.Interface;
using API.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IJWTManagerService _jWTManager;
        public AuthController(IJWTManagerService jWTManager)
        {
            this._jWTManager = jWTManager;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(AuthRequestDTO request)
        {
            try
            {
                var data = new User()
                {
                    Name = request.Username,
                    Password = request.Password
                };
                var result = await _jWTManager.Authenticate(data);
                if (result != null)
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Ok("You are authenticated");
        }
    }
}

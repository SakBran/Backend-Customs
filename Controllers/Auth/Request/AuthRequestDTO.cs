using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers.Auth.Request
{
    public class AuthRequestDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
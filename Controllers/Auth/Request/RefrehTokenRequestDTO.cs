using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackendCustoms.Controllers.Auth.Request
{
    public class RefrehTokenRequestDTO
    {
        [Required]
        public string RefreshToken { get; set; }
    }
}